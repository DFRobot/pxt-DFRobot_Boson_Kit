


//% weight=100 color=#0fbc11 icon="\uf0b2"
//% groups="['Analog', 'Digital', 'Heartbeat', 'RGB strip', 'Servo']"
namespace BosonKit {

    let beattime1 = 0;
    let beattime2 = 0;
    let beattime3 = 0;
    let averagetime = 0;

    let _brightness = 255;
    let rgb_pin = -1;
    let neopixel_buf: Buffer;
    let ledsum = -1;

    //% block="read pin %pin Rotation Sensor value (i1)" 
    //% group="Analog"
    //% weight=50
    export function bos0001(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin light (i4)"
    //% group="Analog" 
    //% weight=100
    export function bos0004(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin Steam Sensor value (i6)"
    //% group="Analog" 
    //% weight=46
    export function bos0006(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin Flame Sensor value (i7)"
    //% group="Analog" 
    //% weight=44
    export function bos0007(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin Sound Sensor value (i9)" 
    //% group="Analog"
    //% weight=42
    export function bos0009(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin Infrared Proximity Sensor value (i10)"
    //% group="Analog" 
    //% weight=40
    export function bos0010(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin temperature (i11)"
    //% group="Analog" 
    //% weight=95
    export function bos0011(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return Math.round((100 * value * (3.3 / 10.24)) * 3.3 / 10.24) / 100;
    }

    //% block="read pin %pin soil moisture (i16)" 
    //% group="Analog"
    //% weight=90
    export function bos0038(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return value;
    }

    //% block="read pin %pin Humidity Sensor Sensor value (i18)"
    //% group="Analog" 
    //% weight=34
    export function bos0041(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return Math.round(value / 10);
    }

    //% block="read pin %pin waterproof temperature (i19)"
    //% group="Analog" 
    //% weight=85
    export function bos0042(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        let n_Vref: number = 3.3;
        let n_Voltage_Value: number = ((value / 1024.0) * n_Vref);
        let n_Rt: number = ((n_Voltage_Value * 10.0) / (n_Vref - n_Voltage_Value));
        if (((0.593 > n_Rt) || (n_Rt > 331.498))) {
            return -1;
        }
        else {
            return Math.round(((1177692.5 / (3950 + (298.15 * (Math.log((n_Rt / 10.0)))))) - 270.35) * 100) / 100;
        }

    }

    //% block="read pin %pin Ultrasonic Distance Sensor (i22)"
    //% group="Analog" 
    //% weight=30
    export function bos0045(pin: AnalogPin): number {

        let value: number = Math.round(10 * pins.analogReadPin(pin) * (100 / 1023));
        return value;
    }


    //% block="read pin %pin air humidity SHT30 (i27)"
    //% group="Analog" 
    //% weight=80
    export function bos0056(pin: AnalogPin): number {

        let value: number = pins.analogReadPin(pin);
        return Math.round(value / 10);
    }

    //% block="read pin %pin pH Sensor V2 value (i28)"
    //% group="Analog" 
    //% weight=26
    export function bos0061(pin: AnalogPin): number {

        let map: number = 1024;
        let aref: number = 3300;
        let _neutralVoltage: number = 1500.0;
        let _acidVoltage: number = 2032.44;
        let voltage: number = pins.analogReadPin(pin) / map * aref;
        let slope: number = (7.0 - 4.0) / ((_neutralVoltage - 1500.0) / 3.0 - (_acidVoltage - 1500.0) / 3.0);
        let intercept: number = 7.0 - slope * (_neutralVoltage - 1500.0) / 3.0;
        let _phValue: number = Math.round(slope * (voltage - 1500.0) / 3.0 + intercept);
        return _phValue;
    }

    //% block="LED String Light pin %pin analog write %value (o4)"
    //% group="Analog" 
    //% value.min=0 value.max=1023
    //% weight=24
    export function bos0019_a(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);
    }

    //% block="Buzzer Module pin %pin analog write %value (o5)" 
    //% group="Analog"
    //% value.min=0 value.max=1023
    //% weight=22
    export function bos0020_a(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);
    }

    //% block="Fan Module pin %pin analog write %value  (o6)"
    //% group="Analog" 
    //% value.min=0 value.max=1023
    //% weight=20
    export function bos0021_a(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);
    }

    //% block="Motor Controller Module pin %pin analog write %value (o9)" 
    //% group="Analog"
    //% value.min=0 value.max=1000
    //% weight=18
    export function bos0024(pin: AnalogPin, value: number): void {

        pins.analogWritePin(pin, value);
    }

    //% block="read pin %pin Blue Push Button value (i2b)" 
    //% group="Digital"
    //% weight=98
    export function bos0002_B(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Red Push Button value (i2r)" 
    //% group="Digital"
    //% weight=96
    export function bos0002_R(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Yellow Push Button value (i2y)" 
    //% group="Digital"
    //% weight=94
    export function bos0002_Y(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Self Locking Switch value  (i3)" 
    //% group="Digital"
    //% weight=92
    export function bos0003(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Tilt Switch value (i5)" 
    //% group="Digital"
    //% weight=88
    export function bos0005(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Touch Sensor value (i8)"
    //% group="Digital" 
    //% weight=82
    export function bos0008(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Conductivity Switch value (i12)" 
    //% group="Digital"
    //% weight=74
    export function bos0012(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="read pin %pin Motion Sensor value (i13)" 
    //% group="Digital"
    //% weight=72
    export function bos0013(pin: DigitalPin): number {

        let value: number = pins.digitalReadPin(pin);
        return value;
    }

    //% block="init pin %pin Heart Rate sensor (i20)" 
    //% group="Heartbeat"
    //% weight=65
    export function init_bos0043(pin: DigitalPin): void {

        pins.setEvents(pin, PinEventType.Touch);
        switch (pin) {
            case DigitalPin.P0: control.onEvent(EventBusSource.MICROBIT_ID_IO_P0, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P1: control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P2: control.onEvent(EventBusSource.MICROBIT_ID_IO_P2, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P3: control.onEvent(EventBusSource.MICROBIT_ID_IO_P3, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P4: control.onEvent(EventBusSource.MICROBIT_ID_IO_P4, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P5: control.onEvent(EventBusSource.MICROBIT_ID_IO_P5, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P6: control.onEvent(EventBusSource.MICROBIT_ID_IO_P6, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P7: control.onEvent(EventBusSource.MICROBIT_ID_IO_P7, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P8: control.onEvent(EventBusSource.MICROBIT_ID_IO_P8, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P9: control.onEvent(EventBusSource.MICROBIT_ID_IO_P9, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P10: control.onEvent(EventBusSource.MICROBIT_ID_IO_P10, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P11: control.onEvent(EventBusSource.MICROBIT_ID_IO_P11, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P12: control.onEvent(EventBusSource.MICROBIT_ID_IO_P12, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P13: control.onEvent(EventBusSource.MICROBIT_ID_IO_P13, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P14: control.onEvent(EventBusSource.MICROBIT_ID_IO_P14, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P15: control.onEvent(EventBusSource.MICROBIT_ID_IO_P15, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            case DigitalPin.P16: control.onEvent(EventBusSource.MICROBIT_ID_IO_P16, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, pinCallback); break;
            default: break;
        }
        beattime1 = 0;
        beattime2 = 0;
    }

    //% block="read Heart Rate (times per minute) (i20)" 
    //% group="Heartbeat"
    //% weight=64
    export function bos0043(): number {
        if (averagetime == 0) {
            return 0;
        }
        let value: number = Math.round(29000 / averagetime);
        return value;
    }

    //% block="LED String Light pin %pin digital write %value (o4)" 
    //% group="Digital"
    //% value.min=0 value.max=1
    //% weight=54
    export function bos0019_d(pin: DigitalPin, value: number): void {

        pins.digitalWritePin(pin, value);
    }

    //% block="Buzzer Module pin %pin digital write %value (o5)" 
    //% group="Digital"
    //% value.min=0 value.max=1
    //% weight=50
    export function bos0020_d(pin: DigitalPin, value: number): void {

        pins.digitalWritePin(pin, value);
    }

    //% block="Fan Module pin %pin digital write %value (o6)" 
    //% group="Digital"
    //% value.min=0 value.max=1
    //% weight=46
    export function bos0021_d(pin: DigitalPin, value: number): void {

        pins.digitalWritePin(pin, value);
    }

    //% block="Voice Recorder Module pin %pin digital write %value (o7)" 
    //% group="Digital"
    //% value.min=0 value.max=1
    //% weight=42
    export function bos0022(pin: DigitalPin, value: number): void {

        pins.digitalWritePin(pin, value);
    }

    //% block="Servo Controller Module pin %pin digital write %value (o10)" 
    //% group="Digital"
    //% value.min=0 value.max=1
    //% weight=38
    export function bos0025(pin: DigitalPin, value: number): void {

        pins.digitalWritePin(pin, value);
    }

    //% block="init RGB LED strip pin %pin Number of lights %num"
    //% group="RGB strip"
    //% num.min=1 num.max=50 num.defl=8
    //% weight=100
    export function M011_00184_init(pin: DigitalPin, num: number): void {
        rgb_pin = pin;
        neopixel_buf = pins.createBuffer(16 * num);
        for (let i = 0; i < 16 * num; i++) {
            neopixel_buf[i] = 0;
        }
        ledsum = num;
    }

    //% block="Set the brightness of the RGB LED strip  %brightness"
    //% group="RGB strip"
    //% brightness.min=0 brightness.max=255 brightness.defl=255
    //% weight=90
    export function M011_00184_brightness(brightness: number): void {

        _brightness = brightness;
    }

    //% block="RGB LED strip from %from to %to"
    //% group="RGB strip"
    //% from.min=1 from.max=50 from.defl=1
    //% to.min=1 to.max=50 to.defl=2
    //% weight=80
    export function M011_00184_ledRange(from: number, to: number): number {
        return ((from - 1) << 16) + (2 << 8) + (to);
    }

    //% block="RGB LED strip %index show color %color"
    //% group="RGB strip"
    //% index.min=1 index.max=50 index.defl=1
    //% color.shadow="colorNumberPicker"
    //% weight=70
    export function M011_00184_setIndexColor(index: number, color: number): void {
        let f = index - 1;
        let t = index - 1;
        let r = (color >> 16) * (_brightness / 255);
        let g = ((color >> 8) & 0xFF) * (_brightness / 255);
        let b = ((color) & 0xFF) * (_brightness / 255);

        if ((index - 1) > 15) {
            if ((((index - 1) >> 8) & 0xFF) == 0x02) {
                f = (index - 1) >> 16;
                t = (index - 1) & 0xff;
            } else {
                f = 0;
                t = -1;
            }
        }
        for (let i = f; i <= t; i++) {
            neopixel_buf[i * 3 + 0] = Math.round(g)
            neopixel_buf[i * 3 + 1] = Math.round(r)
            neopixel_buf[i * 3 + 2] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, rgb_pin);

    }

    //% block="show color %rgb"
    //% group="RGB strip"
    //% weight=60
    //% rgb.shadow="colorNumberPicker"
    export function M011_00184_showColor(rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        for (let i = 0; i < 3 * ledsum; i++) {
            if ((i % 3) == 0)
                neopixel_buf[i] = Math.round(g)
            if ((i % 3) == 1)
                neopixel_buf[i] = Math.round(r)
            if ((i % 3) == 2)
                neopixel_buf[i] = Math.round(b)
        }
        ws2812b.sendBuffer(neopixel_buf, rgb_pin)
    }

    //% block="Set the slake of the RGB LED strip"
    //% group="RGB strip"
    //% weight=50
    export function M011_00184_off(): void {

        M011_00184_showColor(0);
    }

    //% block="red %red green %green blue %blue"
    //% group="RGB strip"
    //% red.min=0 red.max=255 red.defl=0
    //% green.min=0 green.max=255 green.defl=0
    //% blue.min=0 blue.max=255 blue.defl=0
    //% weight=40
    export function M011_00184_rgb(red: number, green: number, blue: number): number {

        return (red << 16) + (green << 8) + (blue);
    }

    //% weight=50
    //% group="RGB strip"
    //% startHue.defl=1
    //% endHue.defl=360
    //% startHue.min=0 startHue.max=360
    //% endHue.min=0 endHue.max=360
    //% block="show rainbow color from%startHue to%endHue"
    export function  M011_00184_ledRainbow(startHue: number, endHue: number) {
        startHue = startHue >> 0;
        endHue = endHue >> 0;
        const saturation = 100;
        const luminance = 50;
        let steps = ledsum + 1;
        const direction = HueInterpolationDirection.Clockwise;

        //hue
        const h1 = startHue;
        const h2 = endHue;
        const hDistCW = ((h2 + 360) - h1) % 360;
        const hStepCW = Math.idiv((hDistCW * 100), steps);
        const hDistCCW = ((h1 + 360) - h2) % 360;
        const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
        let hStep: number;
        if (direction === HueInterpolationDirection.Clockwise) {
            hStep = hStepCW;
        } else if (direction === HueInterpolationDirection.CounterClockwise) {
            hStep = hStepCCW;
        } else {
            hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
        }
        const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

        //sat
        const s1 = saturation;
        const s2 = saturation;
        const sDist = s2 - s1;
        const sStep = Math.idiv(sDist, steps);
        const s1_100 = s1 * 100;

        //lum
        const l1 = luminance;
        const l2 = luminance;
        const lDist = l2 - l1;
        const lStep = Math.idiv(lDist, steps);
        const l1_100 = l1 * 100

        //interpolate
        if (steps === 1) {
            writeBuff(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
        } else {
            writeBuff(0, hsl(startHue, saturation, luminance));
            for (let i = 1; i < steps - 1; i++) {
                const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                const s = Math.idiv((s1_100 + i * sStep), 100);
                const l = Math.idiv((l1_100 + i * lStep), 100);
                writeBuff(0 + i, hsl(h, s, l));
            }
            writeBuff(3, hsl(endHue, saturation, luminance));
        }
        ws2812b.sendBuffer(neopixel_buf, rgb_pin)
    }

    //% block="9g Metal Gear Micro Servo pin %pin angle %angle" 
    //% group="Servo"
    //% angle.min=0 angle.max=180
    //% weight=36
    export function ser0045(pin: AnalogPin, angle: number): void {
        pins.servoWritePin(pin, angle)
    }

    function pinCallback(): void {
        beattime3 = input.runningTime();
        averagetime = ((beattime3 - beattime2) + (beattime2 - beattime1)) / 2;
        beattime2 = beattime3;
        beattime1 = beattime2;
    }

    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }

    function writeBuff(index: number, rgb: number) {
        let r = (rgb >> 16) * (_brightness / 255);
        let g = ((rgb >> 8) & 0xFF) * (_brightness / 255);
        let b = ((rgb) & 0xFF) * (_brightness / 255);
        neopixel_buf[index * 3 + 0] = Math.round(g)
        neopixel_buf[index * 3 + 1] = Math.round(r)
        neopixel_buf[index * 3 + 2] = Math.round(b)
    }

    function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;

        return (r << 16) + (g << 8) + b;
    }
}