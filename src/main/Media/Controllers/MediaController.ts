import * as Robot from 'cloudpurge_robotjs';
import LoggedBaseController from "../../Library/Controllers/LoggedBaseController";
import MediaValidator from "../Validators/MediaValidator";

export default class MediaController extends LoggedBaseController
{
    protected mediaPlaying: boolean;

    public constructor()
    {
        super();
        this.validator = new MediaValidator();
        this.mediaPlaying = false;
    }

    public volumeUp(): any
    {
        Robot.keyTap('audio_vol_up');
    }

    public volumeDown(): any
    {
        Robot.keyTap('audio_vol_down');
    }

    public volumeMute(): any
    {
        Robot.keyTap('audio_mute');
    }

    public playPause(): any
    {
        this.mediaPlaying = !this.mediaPlaying;

        if (this.mediaPlaying) {
            Robot.keyTap('audio_play');
        } else {
            Robot.keyTap('audio_pause');
        }
    }

    public back(): any
    {
        Robot.keyTap('left');
    }

    public forward(): any
    {
        Robot.keyTap('right');
    }

    public up(): any
    {
        Robot.keyTap('up');
    }

    public down(): any
    {
        Robot.keyTap('down');
    }
}
