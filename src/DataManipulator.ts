import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
      price_def: number,
      ratio: number,
      timestamp: Date,
      upper_bound: number,
      lower_bound: number,
      trigger_alert: number | undefined,
}


export class DataManipulator {
    static generateRow(serverResponds: ServerRespond[]): Row {
    const [abc, def] = serverResponds;


    const price_abc = (abc.top_ask.price + abc.top_bid.price) / 2;
    const price_def = (def.top_ask.price + def.top_bid.price) / 2;


    const ratio = price_abc / price_def;


    const lower_bound = 0.95;
    const upper_bound = 1.05;

    // Determine trigger_alert
    const trigger_alert = (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined;

    // Return a single Row object
    return {
        price_abc,
        price_def,
        ratio,
        timestamp: abc.timestamp > def.timestamp ? abc.timestamp : def.timestamp,
        upper_bound,
        lower_bound,

        trigger_alert,
    };
}

}
