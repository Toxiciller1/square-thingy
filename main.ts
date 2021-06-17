function display_update () {
    serial.writeValue("L", OrientBit.getwheelPulseCount(OrientBit.wheelSide.left))
    serial.writeValue("R", OrientBit.getwheelPulseCount(OrientBit.wheelSide.right))
    OLED12864_I2C.showString(
    0,
    0,
    "l:     ",
    1
    )
    OLED12864_I2C.showNumber(
    3,
    0,
    OrientBit.getwheelPulseCount(OrientBit.wheelSide.left),
    1
    )
    OLED12864_I2C.showString(
    0,
    1,
    "r:     ",
    1
    )
    OLED12864_I2C.showNumber(
    3,
    1,
    OrientBit.getwheelPulseCount(OrientBit.wheelSide.right),
    1
    )
}
basic.forever(function () {
    OLED12864_I2C.init(60)
    OrientBit.enableEncoder(
    DigitalPin.P0,
    DigitalPin.P1,
    16,
    14
    )
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 35)
    while (OrientBit.getwheelDist(OrientBit.wheelSide.left) <= 32) {
        display_update()
        basic.pause(200)
    }
    OrientBit.resetWheelRotCnt()
    maqueen.motorStop(maqueen.Motors.All)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 25)
    basic.pause(1500)
    maqueen.motorStop(maqueen.Motors.All)
})
