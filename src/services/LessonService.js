const LESSON_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/course/CID/module/MID/lesson';
const ALL_LESSON_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        return this[_singleton]
    }

    createLesson(moduleId, lesson) {
        return fetch(LESSON_API_URL.replace('MID', moduleId),
            {   body: JSON.stringify(lesson),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response.json(); })
    }

    findAllLessonsForModule(moduleId) {
        return fetch(
            LESSON_API_URL
            .replace('MID', moduleId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllLessons(){
        return fetch(
            ALL_LESSON_API_URL
        ).then(function(response){
            return response.json();
        })
    }

    deleteLesson(lessonId) {
        return fetch(
            LESSON_API_URL + '/' + lessonId, {
                method: 'delete'
            })
    }


}