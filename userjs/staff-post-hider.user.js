// ==UserScript==
// @name         Staff: Group posts hider
// @description  Hide posts from general feed
// @namespace    reposit.ru
// @author       John Doe
// @include      https://staff.skbkontur.ru/*
// @version      0.1
// @updateURL    http://www.reposit.ru/userjs/staff-post-hider.user.js
// @run-at document-end
// ==/UserScript==

var hideGroups = ['8636'];
var blockOnlyAuthors = null;
// var blockOnlyAuthors = ['va_martynov', 'a.konstantinov']; // hide only these favourite top-spammers
// var blockOnlyAuthors = null; // hide all group posts

var hidePost = false;
// true:hide post completely / false: show post header with opacity

window.setInterval(hideGroupSpam, 2000);

function hideGroupSpam()
{
    var isCurrentNewsItem = document.querySelector('.side-menu a._active[href="/"]'); // hide only in news feed
    if(isCurrentNewsItem == null || location.search != ''
      || hideGroups == null || hideGroups.length == 0) {
        return;
    }
    var posts = document.querySelectorAll('feed-entry.ng-star-inserted');
    for(var postIndex = 0; postIndex < posts.length; postIndex++) {
        var post = posts[postIndex];
        var hideGroup = false;
        for(var groupIndex = 0; groupIndex < hideGroups[groupIndex]; groupIndex++) {
            var groupSelector = 'author-link a[href="/group/'+hideGroups[groupIndex]+'"]';
            if(post.querySelector(groupSelector)) {
                hideGroup = true;
                break;
            }
        }
        if(hideGroup) {
            if(blockOnlyAuthors == null || blockOnlyAuthors.length == 0) {
                hideSelectedPost(post);
            } else {
                for(var i = 0; i < blockOnlyAuthors.length; i++) {
                    var selector = 'author-link.feed-post__author a[href*="'+blockOnlyAuthors[i]+'"]';
                    var blockedAuthor = post.querySelector(selector);
                    if(blockedAuthor != null) {
                        hideSelectedPost(post);
                        break;
                    }
                }
            }
        }
    }
}
function hideSelectedPost(post)
{
    if(hidePost) {
        post.style.display = 'none';
    } else {
        var entry = post.querySelector("feed-entry-element island-card");
        entry.style.maxHeight = '100px';
        entry.style.display = 'block';
        entry.style.boxSizing = 'initial';
        entry.style.opacity = '0.5';
        var feedPostContent = post.querySelector("div.feed-post__content"); if(feedPostContent) { feedPostContent.style.display = "none"; }
        var feedComments = post.querySelector("feed-comments"); if(feedComments) { feedComments.style.display = "none"; }
    }
}
