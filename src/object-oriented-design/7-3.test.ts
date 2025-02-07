import { Song, Collection, MusicBox, Auth, User } from './7-3';

describe('Jukebox System', () => {
    let auth: Auth;

    beforeEach(() => {
        // Reset auth singleton state
        auth = Auth.getInstance();
        auth.authenticate(false, 12345); // Reset to customer
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    describe('Auth', () => {
        it('should maintain singleton instance', () => {
            const auth1 = Auth.getInstance();
            const auth2 = Auth.getInstance();
            expect(auth1).toBe(auth2);
        });

        it('should authenticate admin with correct password', () => {
            const result = auth.authenticate(true, 12345);
            expect(result).toBe('authentication level set to Admin');
            expect(auth.getCurrentUser()).toBe(User.ADMIN);
        });

        it('should reject incorrect password', () => {
            const result = auth.authenticate(true, 99999);
            expect(result).toBe('password is incorrect');
            expect(auth.getCurrentUser()).toBe(User.CUSTOMER);
        });
    });

    describe('MusicBox', () => {
        let musicBox: MusicBox;
        const testSongs = [
            new Song('Song1', 'Artist1', 3000),
            new Song('Song2', 'Artist2', 4000)
        ];

        beforeEach(() => {
            auth.authenticate(true, 12345); // Login as admin
            musicBox = new MusicBox(testSongs);
        });

        it('should require admin privileges to initialize', () => {
            auth.authenticate(false, 12345); // Switch to customer
            expect(() => new MusicBox([])).toThrow('must be authenticated as Admin');
        });

        it('should add songs to collection when admin', () => {
            const newSong = new Song('Song3', 'Artist3', 5000);
            musicBox.addToCollection([newSong]);
            expect(musicBox.collection.songs).toHaveLength(3);
            expect(musicBox.collection.songs).toContainEqual(newSong);
        });

        it('should not add songs to collection when customer', () => {
            auth.authenticate(false, 12345); // Switch to customer
            const newSong = new Song('Song3', 'Artist3', 5000);
            musicBox.addToCollection([newSong]);
            expect(musicBox.collection.songs).toHaveLength(2);
        });

        describe('Playback', () => {
            beforeEach(() => {
                auth.authenticate(false, 12345); // Switch to customer for normal operation
            });

            it('should start playing first added song', () => {
                musicBox.addSong('Song1', 'Artist1');
                expect(musicBox.getNowPlaying()).toEqual(testSongs[0]);
            });

            it('should queue additional songs', () => {
                musicBox.addSong('Song1', 'Artist1');
                const result = musicBox.addSong('Song2', 'Artist2');
                expect(result).toBe('added Song2 by Artist2 to queue');
            });

            it('should advance to next song after duration', () => {
                musicBox.addSong('Song1', 'Artist1');
                musicBox.addSong('Song2', 'Artist2');

                expect(musicBox.getNowPlaying()).toEqual(testSongs[0]);
                jest.advanceTimersByTime(3000); // Advance past first song duration
                expect(musicBox.getNowPlaying()).toEqual(testSongs[1]);
            });

            it('should stop playing when queue is empty', () => {
                musicBox.addSong('Song1', 'Artist1');
                jest.advanceTimersByTime(3000);
                expect(musicBox.getNowPlaying()).toBeNull();
            });

            it('should reject non-existent songs', () => {
                const result = musicBox.addSong('NonExistent', 'NoArtist');
                expect(result).toBe('could not add NonExistent to queue: not in collection');
            });

            it('should clear queue and stop playback when stopped', () => {
                musicBox.addSong('Song1', 'Artist1');
                musicBox.addSong('Song2', 'Artist2');
                musicBox.stopPlayback();

                expect(musicBox.getNowPlaying()).toBeNull();
                // Add a new song to verify queue was cleared
                musicBox.addSong('Song1', 'Artist1');
                expect(musicBox.getNowPlaying()).toEqual(testSongs[0]);
            });
        });
    });
});

