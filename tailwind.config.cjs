module.exports = {
    important: true,
    content: ["./index.html", "./src/client/**/*.tsx", "./src/client/**/*.ts", "./src/pages/**/*.tsx"],
    theme: {
        extend: {
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
            flex: {
                3: "3 3 0%",
            },
        },
        fontSize: {
            'xl': ['20px', '28px'],
            '2xl': ['24px', '32px'],
            '3xl': ['28px', '32px'],
            '5xl': ['48px']
        },
        screens: {
            print: {
                raw: "print",
            },
            "2xl": {
                max: "1535px",
            },
            lg: {
                max: "1280px",
            },
            md: {
                max: "767px",
            },
            sm: {
                max: "639px",
            },
            xs: {
                max: "319px",
            },
        },
    },
    plugins: [],
    safelist: [
        {
            pattern: /gap-(1.5|2.5|3.5)*/,
            variants: ["xs", "sm", "md", "lg"],
        },
        {
            pattern: /font-(extrabold|black)*/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /flex-(col|row)*/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /grid-flow-(col|row)/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /w-full*/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /text-(xs|sm|base|lg|xl|2xl|3xl)*/,
            variants: ["xs", "sm", "md", "lg"],
        },
        {
            pattern: /(top|bottom|left|right)-(1|2|5|10|14|16|20)*/,
            variants: ["xs", "sm", "md", "xl"],
        },
        {
            pattern:
                /(bg|to|from)-(blue|yellow|sky|teal|green)*/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /bg-(amber)-(300)/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /text-(blue|yellow|sky|teal|green)*/,
            variants: ["hover", "focus"],
        },
        {
            pattern: /(to|from)-(cyan|blue|purple|pink|violet|sky)*/,
        },
        {
            pattern: /bg-gradient-to-r/,
        },
        {
            pattern: /divide-(white|black)*/,
        },
        {
            pattern: /max-(h|w)-*/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /min-(h|w)-*/,
            variants: ["xs", "sm", "md"],
        },
        {
            pattern: /p-(0.5|1.5|2.5|8|10|12)/,
            variants: ["xs", "sm", "md", "lg"],
        },
        {
            pattern: /p(x|y|t|b|l|r)-(0|1|2|3|4|5|6|9|10|20)/,
            variants: ["sm", "md"],
        },
        {
            pattern: /-m(x|y|t|b|l|r)-(1|2|3|4)/,
        },
        {
            pattern: /m(x|y|t|b|l|r)-(0|1|2|3|4)/,
            variants: ["sm", "md"],
        },
        {
            pattern: /(w|h)-(0|24|28|32|36|40|44|60|72|96)*/,
            variants: ["sm"],
        },
        {
            pattern: /rounded-(t|b)*/,
        },
        {
            pattern: /border-(t|b|r|l)*/,
        },
        {
            pattern: /aspect-*/,
        },
        {
            pattern: /grid-cols-(1|2|3|4|5)/,
        },
        {
            pattern: /(absolute|relative|sticky|fixed)/,
            variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
        },
        {
            pattern: /bg-neutral-100|bg-neutral-50/,
            variants: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            pattern: /flex|grid/,
            variants: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            pattern: /grow/,
            variants: ["xs", "sm", "md", "lg", "xl"],
        },
        {
            pattern:
                /justify-between|justify-around|justify-evenly|justify-center|justify-end/,
            variants: ["xs", "sm", "md", "lg", "xl"],
        },
    ]
};
