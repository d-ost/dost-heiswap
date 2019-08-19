import {default as WalletConnectBrowser} from "@walletconnect/browser";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

class WalletConnect {
  private walletConnect;

  constructor() {}

  public connect() {
    // Create a walletConnector
    this.walletConnect = new WalletConnectBrowser({
      bridge: "https://bridge.walletconnect.org" // Required
    });

    // Check if connection is already established
    if (!this.walletConnect.connected) {
      // create new session
      this.walletConnect.createSession().then(() => {
        console.log("Session created");
        // get uri for QR Code modal
        const uri = this.walletConnect.uri;
        // display QR Code modal
        WalletConnectQRCodeModal.open(uri, () => {
          console.log("QR Code Modal closed");
        });
      });
    }

    // Subscribe to connection events
    this.walletConnect.on("connect", (error, payload) => {
      console.log("On connect: ");
      console.log("error: ", error);
      console.log("payload: ", payload);
      if (error) {
        throw error;
      }

      // Close QR Code Modal
      WalletConnectQRCodeModal.close();

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    this.walletConnect.on("session_update", (error, payload) => {
      console.log("On session_update: ");
      console.log("error: ", error);
      console.log("payload: ", payload);
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    this.walletConnect.on("disconnect", (error, payload) => {
      console.log("On disconnect: ");
      console.log("error: ", error);
      console.log("payload: ", payload);
      if (error) {
        throw error;
      }

      // Delete walletConnector
    });
  }
}

export default WalletConnect;
