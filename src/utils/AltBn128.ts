/*
 * alt_bn_128 curve in JavaScript
 * Referenced https://github.com/AztecProtocol/aztec-crypto-js/blob/master/bn128/bn128.js
 */

import {soliditySha3, padLeft} from 'web3-utils';

const EC = require('elliptic');
const crypto = require('crypto');
const BN = require('bn.js');
// Types
// Since JS doesn't handle BigInteger well,
// the scalar representation will be the a BN object
export type Scalar = any;//BN; // fixme It is suppose to be BN type but bn.js correct type doesn't exists.
export type Point = [Scalar, Scalar];
export type Signature = [Scalar, Array<Scalar>, Point];

// AltBn128 field properties
const P: Scalar = new BN(
  '21888242871839275222246405745257275088696311157297823662689037894645226208583',
  10
);
const N = new BN(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617',
  10
);
const A = new BN(
  '5472060717959818805561601436314318772174077789324455915672259473661306552146',
  10
);
const G = [new BN(1, 10), new BN(2, 10)];

// Convinience Numbers
const bnOne = new BN('1', 10);
const bnTwo = new BN('2', 10);
const bnThree = new BN('3', 10);

export default class AltBn128 {

  // ECC Curve
  public static get curve() {
    return new EC.curve.short({
      a: '0',
      b: '3',
      p: P,
      n: N,
      gRed: false,
      g: G
    })
  }

  /**
   *  BN.js reduction context for bn128 curve group's prime modulus.
   */
  public static get groupReduction() {
   return BN.red(AltBn128.curve.n);
  }

  /**
   * Gets a random Scalar.
   */
  public static randomScalar() : Scalar{
    return new BN(crypto.randomBytes(32), 16).toRed(AltBn128.groupReduction);
  }

  /**
   * Gets a random Point on curve.
   */
  public static randomPoint(): any {
    const recurse = (): any => {
      const x = new BN(crypto.randomBytes(32), 16).toRed(AltBn128.curve.red);
      const y2 = x
        .redSqr()
        .redMul(x)
        .redIAdd(AltBn128.curve.b);
      const y = y2.redSqrt();
      if (
        y
          .redSqr(y)
          .redSub(y2)
          .cmp(AltBn128.curve.a)
      ) {
        return recurse()
      }
      return [x, y]
    };
    return recurse()
  }

  /**
   *  Returns (beta, y) given x
   *
   *  Beta is used to calculate if the Point exists on the curve
   */
  public static evalCurve(x: Scalar): [Scalar, Scalar] {
    const beta = x
      .mul(x)
      .mod(P)
      .mul(x)
      .mod(P)
      .add(bnThree)
      .mod(P);
    const y = AltBn128.powmod(beta, A, P);
    return [beta, y]
  }

  /**
   *  Calculates a Point given a Scalar
   */
  public static scalarToPoint(_x: Scalar): Point {
    let x = _x.mod(N);

    let beta, y, yP;

    while (true) {
      [beta, y] = AltBn128.evalCurve(x);
      yP = y.mul(y).mod(P);

      if (beta.cmp(yP) === 0) {
        return [x, y]
      }
      x = x.add(bnOne).mod(N)
    }
  }

  /**
   *  ECC addition operation
   */
  public static ecAdd(point1: Point, point2: Point): Point {
    const p1 = AltBn128.curve.point(point1[0], point1[1]);
    const p2 = AltBn128.curve.point(point2[0], point2[1]);
    const fp = p1.add(p2);
    return [fp.getX(), fp.getY()]
  }

  /**
   * ECC multiplication operation
   */
  public static ecMul (p: Point, s: Scalar): Point {
    const fp = AltBn128.curve.point(p[0], p[1]).mul(s);
    return [fp.getX(), fp.getY()];
  }

  /**
   * ECC multiplication operation for G
   */
  public static ecMulG(s: Scalar): Point {
    return AltBn128.ecMul(G as Point, s);
  }

  /**
   * Ring signature generation
   */
  public static ringSign(
    message: Buffer,
    publicKeys: Array<Point>,
    secretKey: Scalar,
    secretKeyIdx: number
  ): Signature {
    const keyCount: number = publicKeys.length;
    let c: Array<Scalar> = Array(keyCount).fill(new BN(0, 10));
    let s: Array<Scalar> = Array(keyCount).fill(new BN(0, 10));

    // Step 1
    let h: Point = AltBn128.h2(AltBn128.serialize(publicKeys));
    let yTilde = AltBn128.ecMul(h, secretKey);

    // Step 2
    let u = AltBn128.randomScalar();
    c[(secretKeyIdx + 1) % keyCount] = AltBn128.h1(
      AltBn128.serialize([
        publicKeys,
        yTilde,
        message,
        AltBn128.ecMul(G as Point, u),
        AltBn128.ecMul(h, u)
      ])
    );

    // Step 3
    const indexes = Array(keyCount)
      .fill(0)
      .map((x, idx) => idx)
      .slice(secretKeyIdx + 1, keyCount)
      .concat(
        Array(secretKeyIdx)
          .fill(0)
          .map((_x, _idx) => _idx)
      );

    let z1, z2;

    indexes.forEach(i => {
      s[i] = AltBn128.randomScalar();

      z1 = AltBn128.ecAdd(AltBn128.ecMul(G as Point, s[i]), AltBn128.ecMul(publicKeys[i], c[i]));
      z2 = AltBn128.ecAdd(AltBn128.ecMul(h, s[i]), AltBn128.ecMul(yTilde, c[i]));

      c[(i + 1) % keyCount] = AltBn128.h1(
        AltBn128.serialize([publicKeys, yTilde, message, z1, z2])
      )
    });

    // Step 4
    const sci = secretKey.mul(c[secretKeyIdx]).mod(N);

    s[secretKeyIdx] = u.sub(sci);

    // JavaScript negative modulo bug -_-
    if (s[secretKeyIdx] < 0) {
      s[secretKeyIdx] = s[secretKeyIdx].add(N);
    }

    s[secretKeyIdx] = s[secretKeyIdx].mod(N);

    return [c[0], s, yTilde]
  }

  /**
   *  Ring signature verification
   */
  public static ringVerify(
    message: string,
    publicKeys: Array<Point>,
    signature: Signature
  ): Boolean {
    const keyCount = publicKeys.length;

    const [c0, s, yTilde] = signature;
    let c = c0.clone();

    // Step 1
    const h = AltBn128.h2(AltBn128.serialize(publicKeys));

    let z1, z2;

    for (let i = 0; i < keyCount; i++) {
      z1 = AltBn128.ecAdd(AltBn128.ecMul(G as Point, s[i]), AltBn128.ecMul(publicKeys[i], c));
      z2 = AltBn128.ecAdd(AltBn128.ecMul(h, s[i]), AltBn128.ecMul(yTilde, c));

      if (i < keyCount - 1) {
        c = AltBn128.h1(AltBn128.serialize([publicKeys, yTilde, message, z1, z2]));
      }
    }

    return c0.cmp(AltBn128.h1(AltBn128.serialize([publicKeys, yTilde, message, z1, z2]))) === 0
  }


/* Helper Functions */

/**
 *  Efficient powmod implementation.
 *
 *  Reference: https://gist.github.com/HarryR/a6d56a97ba7f1a4ebc43a40ca0f34044#file-longsigh-py-L26
 *  Returns (a^b) % n
 */
  public static powmod(a: Scalar, b: Scalar, n: Scalar): Scalar {
    let c = new BN('0', 10);
    let f = new BN('1', 10);
    let k = new BN(Math.log(b) / Math.log(2), 10);

    let shiftedK;

    while (k >= 0) {
      c = c.mul(bnTwo);
      f = f.mul(f).mod(n);

      shiftedK = new BN('1' + '0'.repeat(k), 2);

      if (b.and(shiftedK) > 0) {
        c = c.add(bnOne);
        f = f.mul(a).mod(n);
      }

      k = k.sub(bnOne);
    }

    return f;
  }

  /**
   * Returns a Scalar repreesntation of the hash of the input.
   */
  public static h1(s: string): Scalar {
    // Want to be compatible with the solidity implementation
    // which prepends "0x" by default
    if (s.indexOf('0x') !== 0) {
      s = '0x' + s
    }

    const h = soliditySha3(s).slice(2); // Remove the "0x"
    const b = new BN(h, 16);

    return b.mod(N);
  }

  /**
   * Returns ECC Point of the Scalar representation of the hash
   * of the input.
   */
  public static h2(hexStr: string): Point {
    // Note: hexStr should be a string in hexadecimal format!
    return AltBn128.scalarToPoint(AltBn128.h1(hexStr));
  }

  /**
   * Serializes the inputs into a hex string
   */
  public static serialize(arr: Array<any>): string {
    if (!Array.isArray(arr)) {
      // eslint-disable-next-line no-throw-literal
      throw 'arr should be of type array'
    }

    return arr.reduce((acc, x) => {
      if (typeof x === 'string') {
        acc = acc + Buffer.from(x).toString('hex')
      } else if (Array.isArray(x)) {
        acc = acc + AltBn128.serialize(x)
      } else if (Buffer.isBuffer(x)) {
        acc = acc + x.toString('hex')
      } else if (x.getX !== undefined && x.getY !== undefined) {
        // Point
        acc = acc + padLeft(x.getX().toString(16), 64, '0')
        acc = acc + padLeft(x.getY().toString(16), 64, '0')
      } else if (x.toString !== undefined) {
        acc = acc + padLeft(x.toString(16), 64, '0')
      }

      return acc
    }, '')
  }

}
