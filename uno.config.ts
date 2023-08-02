import { defineConfig } from 'unocss';
import { presetUno } from 'unocss';

export default defineConfig({
    // ...UnoCSS options
    presets: [
        presetUno(),
    ],
    theme: {
        colors: {
            primary: "#fecaca",
            secondary: "#ea580c",
            ternary: "#EFE4E4",
            sober: "#ffffff",
            quatary: "#D8AC0F",
            common: "#48C479 ",
            golden: "#D8AC0F",
            delivery: "#C7D1FF",
            pickup: "#DADEF3",
            brand: {
                DEFAULT: "#ED7829",
                100: "#F8CAB1",
                300: "#EB9F75",
                400: "#F4894F",
                500: "#ED7829",
                900: "#D26023"
            },
            neutral: {
                50: "#F9FAFD",
                100: "#F3F6FB",
                200: "#E4E8EE",
                300: "#CED8E0",
                400: "#96A5B8",
                500: "#607288",
                600: "#404F64",
                700: "#28374B",
                800: "#121A32",
                900: "#040917",
            },
            success: {
                100: "#E7F7F1",
                300: "#8AD1AA",
                400: "#53B67F",
                500: "#327251",
                900: "#1C4732",
            },
            error: {
                100: "#F2CED1",
                300: "#C28387",
                400: "#BA2932",
                500: "#941E17",
                900: "#62110F",
            },
            primary_yellow: "#fed340",
            store_yellow: "#F8CE3A",
            custom_golden: "#E5B615",
            custom_black: "#000011",
            custom_gray: "#414141",
            custom_lightgray: "#C0C0C0",
            custom_cyan: "#028C7C",
            customGray: "#717171",
            customGrayTwo: "#818181",
            darkGray: " #313131",
            secondaryCustomGray: "#898989",
            custom_skyblue: "#CCF0FF",
            custom_yellow: "#E5B615",
            breadcrumbs: "#515151",
            radioButtonBorder: "#C7C7C7",
            banner: "#E1DFE0",
            bannerText: "#212121",
            storepickup: "#FFEBA1",
        },
        fontFamily: {
            manrope: "Manrope",
            poppins: "Poppins",
        },
        fontSize: {
            'xl': ['20px', '28px'],
            '2xl': ['24px', '32px'],
            '3xl': ['28px', '32px'],
            '5xl': ['48px', '48px'],
        },
    }
})