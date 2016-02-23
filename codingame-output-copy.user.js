// ==UserScript==
// @name         Codingame output copy
// @namespace    https://namal.ovh
// @version      0.1
// @description  Allows you to copy the output of a test case in codingame
// @author       Namal
// @match        https://www.codingame.com/*
// @grant        none
// ==/UserScript==
'use strict';

$(function(){

    //source: http://stackoverflow.com/a/22581382/5795409
    function copyToClipboard(elem) {
        // create hidden text element, if it doesn't already exist
        var targetId = "_hiddenCopyText_";
        //var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
        var origSelectionStart, origSelectionEnd;

        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.text().replace(/^\s*[\r\n]/gm, "");

        // select the content
        var currentFocus = document.activeElement;
        target.focus();
        target.setSelectionRange(0, target.value.length);

        // copy the selection
        var succeed;
        try {
            succeed = document.execCommand("copy");
        } catch(e) {
            succeed = false;
        }
        // restore original focus
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }

        // clear temporary content
        target.textContent = "";

        return succeed;
    }


    $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">').appendTo('head');
    $('<style>#namalCopy:before{    content: "\\f0c5";    height: 12px;    width: 12px;    color: white;    font-family: FontAwesome;}</style>').appendTo('head');

    var inIde = false;
    
    var intervalID = null;
    
    function intervalIde(){
        if(intervalID!=null)
            clearInterval(intervalID);
        intervalID = setInterval(ideCode,inIde ? 10000 : 2000);
    }
    
    var ideCode = function(){
        if(!inIde && $(".ide").length>0){
            $($('.menu-entries.ps-container')[0]).append('<div class="menu-entry ng-scope copy"><a class="menu-entry-inner" id="namalCopy"><span class="entry-label">Copy</span></a></div>');
            $("#namalCopy").click(function(){
                copyToClipboard($(".cg-ide-console-frame-container"));
                
            });
            inIde=true;
            intervalIde();
        }else if(inIde && $(".ide").length==0){
            inIde=false;
            intervalIde();
        }

    };

    intervalIde();


});

