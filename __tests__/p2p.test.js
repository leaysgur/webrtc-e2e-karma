import { createSign, connectPCandDC } from "./utils";

describe("p2p", () => {
  it("should work", async done => {
    const sign = createSign();
    const uniCh = sign.createUnicastChannel("test-p2p");

    const { peers } = await uniCh.connect();
    await new Promise(r => uniCh.once("channelReady", r));

    const side = peers.length === 1 ? "offer" : "answer";

    const { dc } = await connectPCandDC({ side, uniCh });

    dc.onmessage = ev => {
      expect(ev.data).toBe("fine");
      done();
    };
    dc.send("fine");
  });
});
