# Dragon-Drop [![Codacy Badge](https://api.codacy.com/project/badge/grade/f18d7fbc9a4741e3af16097ebbe63423)](https://www.codacy.com/app/mgapcdev/Dragon-Drop)

## NOTICE: POTENTIAL CROSS-SITE SCRIPTING SECURITY FLAW
> Looking back at this project I've noticed the reading of cookie data doesn't have a proper sanitize process and therefore could allow for cross-site scripting attacks if implemented on a website. The idea was to store information about each image, to not affect multiple users and not create additional server load, but since it's possible to change values in a cookie, code could be inserted for executing php or javascript code. 

> In its current state I can not recommend using the php part of this project.

Fun little project based of the youtube parody: https://www.youtube.com/watch?v=DCu1G2rxj5c

Requires jQuery and jQueryUI to run.

##Instructions:

Drag and drop from "Dragon" to create new dragons.

Click on dragons to highlight them.

When a dragon is highlighted you can use "Change dragon" to change the dragon being shown.

Use "Toggle Ad" to toggle whether to show an ad on the highlighted dragon.

Use "Flip dragon" to create a frontfacing dragon of the highlighted dragon.

Information for dragons are stored as cookies, so reloading the page doesn't change their absolute position.
