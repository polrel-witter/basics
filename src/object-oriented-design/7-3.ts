// Jukebox
//
// Design a musical jukebox using object oriented principles
//
// Elements:
// - A song
//    - Length
//    - Name
//    - Artist
// - Collection of songs
//    - Quantity
//    - Stored in alphabetical order by song name
//    - Admin can add songs
// - Song queue
//    - 1 song is being play at a time
//    - Hidden timer to represent the duration of one song so we know when to play the next song
//    - New song added to the queue appended to end
//    - New songs can be added by anyone who pays
// - Display
//    - Show list of songs and artist
//    - Select a song to add to the queue
//
// Questions:
// - Will the jukebox require payment to play a song?
// - Do we need a full command line prompt?
// - Authentication?
// - Is there a limit to the number of songs that can be added to queue?
//
// Data Structure:
// - Classes
//    - Song
//    - Collection
//    - Queue
//
export enum User { ADMIN, CUSTOMER }

export class Song {
    public name: string;
    public artist: string;
    public duration: number;

    constructor(name: string, artist: string, duration: number) {
        this.name = name;
        this.artist = artist;
        this.duration = duration;
    }
}

export class Collection {
    public songs: Song[];

    constructor(songs: Song[]) {
        this.songs = songs;
    }
}

export class Auth {
    private static instance: Auth;
    private user: User = User.CUSTOMER;
    private pass: number = 12345; // By no means secure, but hey, it's 1949 and we're in the song-playing business

    private constructor() {}

    static getInstance(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth();
        }
        return Auth.instance;
    }

    getCurrentUser(): User {
        return this.user;
    }

    authenticate(login: boolean, pass: number): string {
        if (pass === this.pass) {
            this.user = login ? User.ADMIN : User.CUSTOMER;
            return `authentication level set to ${login ? "Admin" : "Customer"}`;
        }
        return "password is incorrect";
    }

    resetPass(oldPass: number, newPass: number): string {
       if (oldPass === this.pass) {
           this.pass = newPass;
           return "new password set";
       } else return "old password does not match what's set";
    }
}

// TODO should split between play cycles and song management
export class MusicBox {
    private queue: Song[];
    public nowPlaying: Song | null = null;
    public collection: Collection;
    private startTime: number | null = null;
    private checkInterval: number | null = null;
    private auth: Auth;

    constructor(list: Song[]) {
        this.auth = Auth.getInstance();
        if (this.auth.getCurrentUser() === User.ADMIN) {
            this.queue = [];
            this.collection = new Collection(list);
        } else {
          throw new Error("must be authenticated as Admin to initiate MusicBox");
        }
    }

    addToCollection(set: Song[]): void {
        this.auth = Auth.getInstance();
        if (this.auth.getCurrentUser() === User.ADMIN) {
            this.collection = new Collection([ ...this.collection.songs , ...set ]);
        }
    }

    showCollection() {
        for (const song of this.collection.songs) {
            console.log(`${song.name} by ${song.artist}`);
        }
    }

    addSong(name: string, artist: string): string {
        const newSong = this.getSong(name, artist);
        if (!newSong) return `could not add ${name} to queue: not in collection`;

        this.queue.push(newSong);

        if (!this.nowPlaying) {
            this.diskJockey();
            return "congrats, your song's first in the queue";
        }
        return `added ${newSong.name} by ${newSong.artist} to queue`;
    }

    getSong(name: string, artist: string): Song | null {
        for (const song of this.collection.songs) {
            if (song.name === name && song.artist === artist) {
                return song;
            }
        }
        return null;
    }

    private checkPlayback = () => {
        if (!this.nowPlaying || !this.startTime) return;

        const currentTime = Date.now();
        const elapsed = currentTime - this.startTime;

        if (elapsed >= this.nowPlaying.duration!) {
            this.diskJockey(); // Song is done, play next
        }
    }

    diskJockey(): void {
        // Clear existing playback state
        this.startTime = null;

        // Clean up interval and nowPlaying
        if (this.queue.length === 0) {
            this.nowPlaying = null;
            // Stop checking if no more songs
            if (this.checkInterval) {
                clearInterval(this.checkInterval);
                this.checkInterval = null;
            }
            return;
        }

        // Start playing first song in queue
        this.nowPlaying = this.queue.shift()!;
        this.startTime = Date.now();

        // Start checking playback if not already checking
        if (!this.checkInterval) {
            this.checkInterval = setInterval(this.checkPlayback, 1000) as any; // Check every second
        }
    }

    stopPlayback(): void {
        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
        this.startTime = null;
        this.nowPlaying = null;
        this.queue = [];
    }

    getNowPlaying(): Song | null {
        return this.nowPlaying;
    }
}
