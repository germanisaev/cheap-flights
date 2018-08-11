// model for the configuration data 
export class Configuration {
    constructor(
        public webApiBaseUrl: string,
        public headerUrl: string,
        public footerUrl: string,
        public reCaptcha: string,
        public webApiUrl: string,
        public govApiUrl: string,
        public officeWebsite: string
    ) { }

}