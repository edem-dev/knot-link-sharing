import React from 'react';
import Card from "@/components/atomic/Card";

const AnalyticsCardWrapper = () => {
    return (
        <>
            {/*    User data values*/}
            <div className={"flex flex-col md:flex-row  gap-2 justify-center  "}>
                <div className={"grow"}>
                    <Card
                        variant={"outlined"}
                        translateY={false}
                    >
                        <p className={"text-sm font-body"}>{"Total Clicks"}</p>
                        <p className={"text-3xl font-bold font-headings"}>{12345}</p>
                    </Card>
                </div>
                <div className={"grow"}>
                    <Card
                        variant={"outlined"}
                        translateY={false}
                    >
                        <p className={"text-sm font-body"}>{"Unique Visitors"}</p>
                        <p className={"text-3xl font-bold font-headings"}>{8910}</p>
                    </Card>
                </div>

                <div className={"grow"}>
                    <Card
                        variant={"outlined"}
                        translateY={false}
                    >
                        <p className={"text-sm font-body"}>{"Conversion rates (Products)"}</p>
                        <p className={"text-3xl font-bold font-headings"}>{"3.2%"}</p>
                    </Card>
                </div>

            </div>
        </>
    );
};

export default AnalyticsCardWrapper;
