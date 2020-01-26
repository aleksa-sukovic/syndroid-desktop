import * as Robot from 'robotjs';
import MediaValidator from "../Validators/MediaValidator";
import BaseController from '../../Library/Controllers/BaseController';

export default class MediaController extends BaseController
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
