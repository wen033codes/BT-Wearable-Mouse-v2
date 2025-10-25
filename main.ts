input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (Mic > 0) {
        Mic = 0
        basic.showIcon(IconNames.EighthNote)
        basic.pause(200)
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            . . # . .
            . # # # .
            `)
        basic.showLeds(`
            # . # . .
            . # # # .
            . # # # .
            . . # # .
            . # # . #
            `)
    } else {
        Mic = Sound
        act = 0
        lastTime = input.runningTime()
        input.setSoundThreshold(SoundThreshold.Loud, Mic * 16)
        basic.showLeds(`
            # . # . .
            . # # # .
            . # # # .
            . . # # .
            . # # . #
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            . . # . .
            . # # # .
            `)
        basic.showNumber(Mic)
    }
    basic.pause(200)
    basic.clearScreen()
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    basic.pause(5000)
    basic.clearScreen()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.pause(5000)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    if (levelX < max) {
        levelX += 1
    } else {
        levelX = min
    }
    basic.showArrow(ArrowNames.West)
    basic.showArrow(ArrowNames.East)
    basic.showNumber(levelX)
    basic.pause(200)
    basic.clearScreen()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Mic == 0) {
        basic.showLeds(`
            # . # . .
            . # # # .
            . # # # .
            . . # # .
            . # # . #
            `)
    } else {
        if (Mic > 1) {
            Mic += -1
        } else {
            Mic = 9
        }
        input.setSoundThreshold(SoundThreshold.Loud, Mic * 16)
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            . . # . .
            . # # # .
            `)
        basic.showNumber(Mic)
    }
    if (Mic < Sound && Mic > 0) {
        basic.pause(100)
        basic.showIcon(IconNames.EighthNote)
        basic.showLeds(`
            # . # . .
            . # # # .
            . . # . #
            # # # # .
            # # # . #
            `)
    }
    basic.pause(100)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    if (levelX == 0) {
        levelX = 5
        levelY = 5
        basic.showIcon(IconNames.SmallDiamond)
        basic.showIcon(IconNames.Diamond)
    } else if (levelX == 5) {
        levelX = 0
        levelY = 0
        basic.showIcon(IconNames.Diamond)
        basic.showIcon(IconNames.SmallDiamond)
    }
    basic.showNumber(levelX)
    basic.pause(200)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (levelY < max) {
        levelY += 1
    } else {
        levelY = min
    }
    basic.showArrow(ArrowNames.North)
    basic.showArrow(ArrowNames.South)
    basic.showNumber(levelY)
    basic.pause(200)
    basic.clearScreen()
})
input.onPinPressed(TouchPin.P1, function () {
    actTme = input.runningTime()
    if (actTme - lastTime <= LimitS || act == 0) {
        act += 1
        if (Mic == 0 || Mic > 7) {
            if (act == 1) {
                music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            } else if (act == 2) {
                music.play(music.tonePlayable(587, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            } else if (act == 3) {
                music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            } else {
                music.play(music.tonePlayable(698, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
            }
        }
    }
    lastTime = actTme
})
input.onSound(DetectedSound.Loud, function () {
    if (Mic > 0) {
        actTme = input.runningTime()
        if (actTme - lastTime <= LimitS || act == 0) {
            act += 1
            if (Mic > 7) {
                if (act == 1) {
                    music.play(music.tonePlayable(523, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
                } else if (act == 2) {
                    music.play(music.tonePlayable(587, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
                } else if (act == 3) {
                    music.play(music.tonePlayable(659, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
                } else {
                    music.play(music.tonePlayable(698, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
                }
            }
        }
    }
    lastTime = actTme
})
let Y = 0
let MoveY = 0
let X = 0
let MoveX = 0
let SpeedY = 0
let SpeedX = 0
let NewY = 0
let NewX = 0
let actTme = 0
let lastTime = 0
let LimitS = 0
let act = 0
let Sound = 0
let Mic = 0
let levelY = 0
let levelX = 0
let min = 0
let max = 0
mouse.startMouseService()
basic.showIcon(IconNames.Heart)
max = 9
min = 0
levelX = 5
levelY = 5
let factor = 0.004
Mic = 0
Sound = 8
act = 0
LimitS = 700
let PressLeft = false
let PressRight = false
let PressHold = false
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Capacitive)
basic.forever(function () {
    NewX = input.acceleration(Dimension.X)
    NewY = input.acceleration(Dimension.Y) * -1
    SpeedX = Math.map(Math.abs(input.acceleration(Dimension.X)), 0, 1023, 1, 10) * (levelX * factor)
    SpeedY = Math.map(Math.abs(input.acceleration(Dimension.Y)), 0, 1023, 1, 10) * (levelY * factor)
    MoveX = SpeedX * (NewX - X)
    MoveY = SpeedY * (NewY - Y)
    if (act > 0 && input.runningTime() - lastTime > LimitS) {
        if (act >= 4) {
            if (PressHold) {
                PressHold = false
            } else {
                PressHold = true
            }
            act = 0
        } else {
            if (act == 1) {
                mouse.click()
                basic.showString("L")
            } else if (act == 2) {
                mouse.click()
                basic.pause(100)
                mouse.click()
                basic.showString("D")
            } else if (act == 3) {
                mouse.rightClick()
                basic.showString("R")
            }
            act = 0
        }
        if (PressHold) {
            basic.showString("H")
        } else {
            basic.clearScreen()
        }
    }
    if (PressHold) {
        mouse.send(
        MoveX,
        MoveY,
        true,
        false,
        false,
        0,
        true
        )
    } else {
        mouse.movexy(MoveX, MoveY)
    }
    X = SpeedX * NewX + (1 - SpeedX) * X
    Y = SpeedY * NewY + (1 - SpeedY) * Y
})
