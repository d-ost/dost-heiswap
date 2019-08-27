class Config {

  public static parse(configData: any, networkType: string) {
    const config = JSON.parse(configData);
    return config[networkType];
  }
}

export default Config;
