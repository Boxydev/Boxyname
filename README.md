# Boxyname

A little tool for convert decimal server name to hexadecimal server name.

Example:
We have one houndred server on pad 3 (10^3 = 1000 servers) :
- bx001
- bx002
- ...
- bx010
- ...
- bx999

Best to get in hexadecimal (16^3 = 4096 servers) :
- bx001
- bx002
- ...
- bx00a
- ...
- bxfff

With this tools, you can easily now what is the name of 1343th server. Oh wait, with Boxyname too easy, it's bx53f :)

```
var boxyname = new Boxyname();
console.log(boxyname.get(1343)); // Display bx53f
```

## Todo

- Export the object as module for use with amazing NodeJS