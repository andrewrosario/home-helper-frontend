export function updateScroll(element) {
    console.log('updateScroll')
    if(element) {
        element.scrollTop = element.scrollHeight;
    }
}