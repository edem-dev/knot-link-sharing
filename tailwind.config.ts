import type {Config} from "tailwindcss";

const config: Config = {
    theme:{
        extend:{
            colors:{
                primary:{
                    DEFAULT:"#42A5F5",
                    light:"#60CFEF",
                    dark:"#1654A5",
                },
            accent:"#F264C6"
            },
            fontFamily:{
                content:["var(--font-inter)", "sans-serif"],
                headings:["var(--font-outfit)" , "sans-serif"]
            }
        },
    }
}

export default config;