import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchEvents } from "../../src/pages/rex/events";

const dormsCapacity = {
    "Baker House": 325,
    "Burton Conner": 388,
    "East Campus": 383,
    MacGregor: 313,
    Maseeh: 500,
    McCormick: 255,
    "New House": 290,
    "New Vassar": 450,
    "Next House": 368,
    Simmons: 369,
    Random: 93,
};

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip);

export default function RexEventChart() {
    const [eventsByDorm, setEventsByDorm] = useState<Map<string, number>>();
    const [api, setApi] = useState<TRexAPIResponse>();

    useEffect(() => {
        fetchEvents().then((d) => {
            setApi(d);
            const byDorm = new Map<string, number>();
            for (const event of d.events) {
                if (byDorm.has(event.dorm))
                    byDorm.set(event.dorm, byDorm.get(event.dorm) + 1);
                else byDorm.set(event.dorm, 1);
            }
            setEventsByDorm(byDorm);
        });
    }, []);

    const labels = Array.from(eventsByDorm?.keys() ?? []);

    return (
        <div>
            {eventsByDorm ? (
                <Bar
                    data={{
                        labels,
                        datasets: [
                            {
                                label: "Events By Dorm",
                                data: Array.from(eventsByDorm.values()),
                                backgroundColor: labels.map((l) =>
                                    api.colors.dorms.get(l),
                                ),
                            },
                        ],
                    }}
                    options={{ plugins: { tooltip: { enabled: true } } }}
                />
            ) : (
                "Loading..."
            )}
        </div>
    );
}