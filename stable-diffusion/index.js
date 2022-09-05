import fsPromises from 'fs/promises';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';
import { $ } from 'zx';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;
const nstClient = new NstrumentaClient();

nstClient.addListener("open", async () => {

    console.log("websocket opened successfully");
    await $`conda init bash`
    await $`conda activate ldm`
    // await $`conda env create -f environment.yaml`
    nstClient.addSubscription('prompt', async (msg) => {
        try {
            const scriptArg = argv.script ? argv.script : "scripts/txt2img.py"
            const promptArg = msg ? '--prompt="' + msg + '"' : "rick astley, portrait, photorealistic"
            const heightArg = argv.height ? '--H=' + argv.height : "--H=320"
            const widthArg = argv.width ? '--W=' + argv.width : "--W=320"
            const command = [
                scriptArg,
                promptArg,
                heightArg,
                widthArg
            ]
            console.log(command)
            await $`python3 ${command}`
            nstClient.send('image-return', 'complete');
        } catch (err) {
            console.error(err);
        };
    });
});

nstClient.addListener("open", () => {
    console.log("websocket opened successfully");
});

console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });