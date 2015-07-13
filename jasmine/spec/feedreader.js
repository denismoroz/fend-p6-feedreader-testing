/*global $, describe, it, expect, allFeeds, beforeEach, loadFeed*/

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against feed reader application.
 */

$(function() {
    'use strict';

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loops through each feed in the allFeeds object
         * and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are not empty', function() {
            var i,
                feedsSize = allFeeds.length,
                feed;

            for (i = 0; i < feedsSize; i += 1) {
                feed = allFeeds[i];
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });


        /* Loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are not empty', function() {
            var i,
                feedsSize = allFeeds.length,
                feed;

            for (i = 0; i < feedsSize; i += 1) {
                feed = allFeeds[i];
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });

    });

    describe('The menu', function() {

        /* Ensures the menu element is hidden by default.*/
        it('menu element is hiden by default', function() {
            var $body = $('body');

            expect($body.hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('toggle menu visibility', function() {
            var $menuIcon = $('.menu-icon-link'),
                $body = $('body');

            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(false);

            $menuIcon.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });

        /* Ensures the menu hides when the feed list  is clicked.
         */
        it('hide menu when clicking feed-list a', function() {
            var $feedListLink = $('.feed-list a'),
                $body = $('body');

            $body.removeClass('menu-hidden');
            $feedListLink.trigger('click');
            expect($body.hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('The Feedlist', function() {

    });



    describe('Initial Entries', function() {
        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loadFeed supply initial feeds', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Load one feed. Read entries and save them.
         * Load another one feed and save entries for them.
         * Compare that feeds different.
         */

        var entries;
        beforeEach(function(done) {
            loadFeed(1, function() {
                entries = $('.entry h2').text();
                loadFeed(0, function() {
                    done();
                });
            });
        });

        it('content changed after loading feed', function(done) {
            var newEntries = $('.entry h2').text();
            expect(newEntries).not.toBe(entries);
            done();
        });
    });
}());