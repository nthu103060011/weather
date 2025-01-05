interface Temperature {
    ElementName: '溫度';
    Time: {
        DataTime: string;
        ElementValue: {
            Temperature: string;
        }[]
    }[]
}

interface RelativeHumidity {
    ElementName: '相對濕度';
    Time: {
        DataTime: string;
        ElementValue: {
            RelativeHumidity: string;
        }[]
    }[]
}

interface ApparentTemperature {
    ElementName: '體感溫度';
    Time: {
        DataTime: string;
        ElementValue: {
            ApparentTemperature: string;
        }[]
    }[]
}

interface BeaufortScale {
    ElementName: '風速';
    Time: {
        DataTime: string;
        ElementValue: {
            BeaufortScale: string;
        }[]
    }[]
}

interface ProbabilityOfPrecipitation {
    ElementName: '3小時降雨機率';
    Time: {
        StartTime: string;
        EndTime: string;
        ElementValue: {
            ProbabilityOfPrecipitation: string;
        }[]
    }[]
}

export interface F_D0047_009 {
    success: boolean;
    records: {
        Locations: {
            DatasetDescription: string;
            LocationsName: string;
            Location: {
                LocationName: string;
                WeatherElement: (Temperature | RelativeHumidity | ApparentTemperature | BeaufortScale | ProbabilityOfPrecipitation)[]
            }[]
        }[]
    };
}

export interface AQX_P_432 {
    success: boolean;
    records: {
        sitename: string;
        aqi: string;
        status: string;
    }[];
}
