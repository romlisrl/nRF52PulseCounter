const exposes = require('zigbee-herdsman-converters/lib/exposes');
const ea = exposes.access;

const definition = {
    zigbeeModel: ['gas-counter', 'pulses-counter'],
    model: 'pulses-counter',
    vendor: 'esphome',
    description: 'Pulses counts',
    fromZigbee: [
        {
            cluster: 'genAnalogInput',
            type: ['attributeReport', 'readResponse'],
            convert: (model, msg, publish, options, meta) => {
                // console.log('EP:', msg.endpoint.ID, 'val:', msg.data.presentValue);
                if (msg.endpoint.ID === 1) {
                    return { total_count: msg.data.presentValue };
                }
                if (msg.endpoint.ID === 2) {
                    const v = msg.data.presentValue;
                    let pct = (v - 3.0) / (4.2 - 3.0) * 100;
                    if (pct > 100) pct = 100;
                    if (pct < 0) pct = 0;
                    return {
                        battery_voltage: v,
                        battery: Math.round(pct)
                    };
                }
            },
        },
    ],
    toZigbee: [],
    exposes: [
        exposes.numeric('total_count', ea.STATE).withUnit('pulses').withDescription('Pulses counts'),
        exposes.numeric('battery', ea.STATE).withUnit('%').withDescription('Battery level'),
        exposes.numeric('battery_voltage', ea.STATE).withUnit('V').withDescription('Battery voltage'),
    ],
    configure: async (device, coordinatorEndpoint, logger) => {
        const ep1 = device.getEndpoint(1);
        await ep1.bind('genAnalogInput', coordinatorEndpoint);
        await ep1.configureReporting('genAnalogInput', [{
            attribute: 'presentValue',
            minimumReportInterval: 0,
            maximumReportInterval: 3600,
            reportableChange: 1,
        }]);
        const ep2 = device.getEndpoint(2);
        await ep2.bind('genAnalogInput', coordinatorEndpoint);
        await ep2.configureReporting('genAnalogInput', [{
            attribute: 'presentValue',
            minimumReportInterval: 0,
            maximumReportInterval: 3600,
            reportableChange: 1,
        }]);
    },
};

module.exports = definition;
