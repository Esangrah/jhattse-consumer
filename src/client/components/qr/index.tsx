import { Html5Qrcode } from "html5-qrcode";
import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode/esm/core";
import React, { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";


interface QrProps {
    fps: number;
    qrbox: any;
    aspectRatio: any;
    disableFlip: boolean;
    verbose?: boolean;
}

interface Props extends QrProps {
    qrCodeSuccessCallback: QrcodeSuccessCallback;
    qrCodeErrorCallback?: QrcodeErrorCallback;
}

export const QRScanner = (props:Props) => {
    let html5QrcodeScanner:Html5Qrcode;
    
    useEffect(() => {
        // Creates the configuration object for Html5QrcodeScanner.
        function createConfig(props:QrProps) {
            var config:any = {};
            if (props.fps) {
            config.fps = props.fps;
            }
            if (props.qrbox) {
            config.qrbox = props.qrbox;
            }
            if (props.aspectRatio) {
            config.aspectRatio = props.aspectRatio;
            }
            if (props.disableFlip !== undefined) {
            config.disableFlip = props.disableFlip;
            }
            return config;
        }

        var config = createConfig(props);
        console.log(config);
        var verbose = props.verbose === true;

        // Suceess callback is required.
        if (!(props.qrCodeSuccessCallback )) {
            throw "qrCodeSuccessCallback is required callback.";
        }
        if (!html5QrcodeScanner?.getState()) {
            html5QrcodeScanner = new Html5Qrcode(qrcodeRegionId, verbose); //new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
            html5QrcodeScanner.start({ facingMode: "environment" }, config, props.qrCodeSuccessCallback, props?.qrCodeErrorCallback);
        }

        return () => {
            // TODO(mebjas): See if there is a better way to handle
            //  promise in `componentWillUnmount`.
            if (html5QrcodeScanner.isScanning) {
                html5QrcodeScanner.stop().then((ignore) => {
                    // QR Code scanning is stopped.
                    console.log("Stopped scanning");
                }).catch((err) => {
                    // Stop failed, handle it.
                    console.log("Stopped scanning" + err);
                });
            }
        }
    }, [])

    return  (
        <div id={qrcodeRegionId} className="w-80 h-full" />
    )
};

export default QRScanner;