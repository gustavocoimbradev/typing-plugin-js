/**
 * typing.plugin.js
 * @version: v1.0.0
 * @author: Gustavo Coimbra
 *
 * Created by Gustavo Coimbra on 2024-01-24. Please report any bug at https://github.com/gustavocoimbradev/Typing-Plugin-JS
 *
 * Copyright (c) 2024 Gustavo Coimbra https://gustavocoimbra.com
 *
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
*/

const typingElements = document.getElementsByClassName('typing-js');
const typingElementsArray = Array.from(typingElements);

const checkHTML = () => {
    if ( typingElements.length ) {
        typingElementsArray.forEach( (element, i) => {
            if (i == 0) {
                const typingTexts = element.children;
                const typingTextsArray = Array.from(typingTexts);
                if ( typingTextsArray.length ) {
                    typingTextsArray.forEach( (text, j) => {
                        if ( text.getAttribute('typing-text') == '' || text.getAttribute('typing-text') == null ) {
                            text.remove();
                        }
                    })
                } else{
                    element.remove();
                }    
            } else {
                element.remove();
            }
        })
    }
}

const startTyping = () => { 
    
    typingElementsArray.forEach( (element, i) => {

        const typingTexts = element.children;
        const typingTextsArray = Array.from(typingTexts);

        let typingSpeed = !isNaN(parseInt(element.getAttribute('typing-time'))) ? parseInt(element.getAttribute('typing-time')) : 40;
        let sleepingTime = !isNaN(parseInt(element.getAttribute('sleeping-time'))) ? parseInt(element.getAttribute('sleeping-time')) : 2000;
        let deletingSpeed = !isNaN(parseInt(element.getAttribute('deleting-time'))) ? parseInt(element.getAttribute('deleting-time')) : 25;
        let intervalTime = !isNaN(parseInt(element.getAttribute('interval-time'))) ? parseInt(element.getAttribute('interval-time')) : 250;
        let typingLoop = !isNaN(parseInt(element.getAttribute('typing-loop'))) ? parseInt(element.getAttribute('typing-loop')) : 1;

        let previousDelay = 0;

        typingTextsArray.forEach( (text, j) => {
   
            let firstItem = document.getElementsByClassName('typing-js')[i].children[0];
            let previousItem = document.getElementsByClassName('typing-js')[i].children[j - 1];
            let currentItem = document.getElementsByClassName('typing-js')[i].children[j];
            let nextItem = document.getElementsByClassName('typing-js')[i].children[j + 1];
            let type = text.getAttribute('typing-text').split('');
            let sleepingDelay = typingSpeed * text.getAttribute('typing-text').length;
            let nextDelay = ( ( typingSpeed * text.getAttribute('typing-text').length ) + sleepingTime + ( deletingSpeed * text.getAttribute('typing-text').length ) + previousDelay ) + intervalTime;


            if(j == 0) {
                nextDelay = intervalTime;
            }

            setTimeout( () => {

                if(j != 0) {
                    previousItem.style.display = 'none'
                }

                currentItem.style.display = 'block';

                type.forEach( (value, k) => {
        
                    setTimeout( () => {
                        text.innerHTML = text.innerHTML + value;
                    }, typingSpeed * k);
        
                });
        
                setTimeout( () => {
                    
                    let temporaryLength = text.innerHTML.length;
        
                    for (let k = 0; k < temporaryLength; k++) {
                        setTimeout( () => {

                            if(nextItem === undefined) {
                                if(typingLoop === 1){
                                    text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
                                }
                            } else {
                                text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
                            }

                            if (text.innerHTML === '')
                            {                                
                                if(nextItem === undefined) {
                                    if(typingLoop === 1){
                                        currentItem.style.display = 'none';
                                        firstItem.style.display = 'block';
                                        startTyping();
                                    }
                                }

                            }

                        }, deletingSpeed * k);
                    }
        
                }, sleepingDelay + sleepingTime);

                

            }, nextDelay);
            
            previousDelay = nextDelay;


        });

    })

}

checkHTML();
startTyping();
