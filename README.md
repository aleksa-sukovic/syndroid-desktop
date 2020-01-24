# SynDroid

SynDroid is application that allows you, on the one hand, to control your computer from your phone, and on the other, to get updates from your phone directly on host computer.

- It was written as an assignment project for `Advanced Programming Techniques` course.

- If you havent already, please read my README file for my [Syndroid Mobile](https://github.com/aleksa-sukovic/syndroid-mobile) project since it is related to this project.

Few sample images are shown `below`.

## Technologies
- Electron.
- TypeScript.
- Angular.

## Preview

Screenshots can be found [here](https://ibb.co/album/goZpFa).

Available for:
- [Linux](https://drive.google.com/file/d/1ymBQ8ui9hZS7WfDUVaF-V-kH9EdJV3Yx/view?usp=sharing)
- Mac (comming soon).
- Windows (comming soon).

## Application Structure

There were few interesting software design principles and techniques I've used in order to make this project the best it could be at this particular moment with my current knowledge.

### Communication protocol

By far the most interesting thing about this project is its communication system. Everything is done trough sockets.

I've built a "miniature" protocol that describes communication between server and client. If you look at example messages you'll think that they look a lot like regular HTTP calls,and you'd be right since HTTP protocol was my inspiration.
   
    /mouse/move?x=15&y=15
        Tells the server to move mouse 15 pixes in both x and y axis.
    /mouse/left-click
        Tells the server to do mouse left click.
    /keyboard/type?char=97
        Tells the server to type letter 'a'.
    /keyboard/type?char=97&modifies=shift
        Tells the server to type letter 'a' but with 'shift' pressed (output is 'A').
    /media/volume/up
        Emulates volume up key press.
    /state/change/shutdown
        Turns of the computer.

As you can see client can control the server. On the other hand, server can request information from device.

    /battery/percentage
        Request battery percentage from connected device.
    /device/info
        Request device info (to be displayed in dashboard).

These are not all of the routes, rather just a small example of communication protocol I've built for this project. I've started from scratch, creating all of the logic needed for parsing and handling incoming request.

This nicely brings us to next topic of the application structure.

### Laravel inspiration

Each object controllable by client is defined via ServiceProvider. You declare service providers in *Application.ts* making objects defined by them available to the entire application. 

```typescript
class MouseServiceProvider implements ServiceProvider
{
    public getRoutes(): Route[]
    {
        return [
            new Route('/mouse/move', MouseController,'move'),
            ...
        ];
    }
}
```

And in *Application.ts*

```typescript 
class Application
{
    ...
    public getProviders(): ServiceProvider[]
    {
        return [
            new MouseServiceProvider(),
            ...
        ];
    }
}
```

You can also validate incoming requests by extending BaseValidator class.

```javascript
class MouseValidator extends BaseValidator
{
    public getRules(): Rule[]
    {
        return [
            new Rule('x', 'move', MouseValidator.FLOAT_REGEX, true),
            new Rule('y', 'move', MouseValidator.FLOAT_REGEX, true),
            new Rule('amount', 'scroll', MouseValidator.FLOAT_REGEX, true),
        ];
    }
}
```

Finally a controller endpoint is defined for each of the object routes.

```javascript
class MouseController extends BaseController 
{
    public move(request) 
    {
        const x = robot.getMousePos().x + parseFloat(request.params.x);
        const y = robot.getMousePos().y + parseFloat(request.params.y);

        robot.moveMouse(x, y);

        return '';
    }
```

## Images

![Syndroid Server Welcome](https://drive.google.com/uc?export=view&id=1mb6MhRxs8O8_qJP5h_bhwn5niz2R1j2_)
![Syndroid Server Dashboard](https://drive.google.com/uc?export=view&id=1cnZmIaNJPkO6sYNge4Lcmf8zjStQDNGo)

## Dependencies
* You will need *node package manager* which comes pre-installed with NodeJS (https://nodejs.org/en)
* In order to use SynDroid generator you must globally install Yeoman generator library.
```
sudo npm install -g yo
```

## Project setup

1. Clone this repository wherever you see fit.
2. From terminal, navigate to cloned repository.
4. Run `npm install`.
4. From terminal navigate to *syndroid-generator* directory `cd ./src/generators/syndroid-generator`.
5. Run the following command to make generator globally available: `npm link`.
6. To run application for local development use `npm run start`.

### Using Generator
SynDroid generator allows you to easily create new objects which can be directly integrated into application.

1. Navigate to cloned repository.
2. Run `yo syndroid:object`.
3. When prompted, enter new object name.
4. You can now add newly created service provider to *Application.ts*.

### Node Scripts
To run application for development: `npm run start`.

To build application for production: `npm run electron:target` where target is `[linux,mac,windows]`.
