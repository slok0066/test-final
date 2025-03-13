declare module '@everapi/freecurrencyapi-js' {
  interface FreecurrencyapiResponse {
    data: {
      [key: string]: number;
    };
  }

  interface FreecurrencyapiOptions {
    base_currency?: string;
    currencies?: string[];
  }

  class Freecurrencyapi {
    constructor(apiKey: string);
    latest(options?: FreecurrencyapiOptions): Promise<FreecurrencyapiResponse>;
  }

  export default Freecurrencyapi;
} 