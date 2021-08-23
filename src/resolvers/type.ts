import { IResolvers } from 'graphql-tools';
import { StudentModel } from '../data/student';
import { CursoModel } from '../data/curso';

import _ from 'lodash';
const type: IResolvers = {
    //Mappers
    //Para cada estudiante haga esto si retorna cursos:
    //Busca el ID Del objeto de cursos que recibio y retorna informacion
    Estudiante: {
        courses: parent => {

            return CursoModel.find({ id: { $in: parent.courses } })
                .then((cursos) => { return cursos })
                .catch((error) => { return new Error('Error encontrando el estudiante: ' + error) });
        }
    },

    Curso: {
        students: parent => {
            const idCurso = parent.id;

            return StudentModel.find({ courses: { $all: [idCurso] } })
                .then((students) => { return students })
                .catch((error) => { return new Error('Error encontrando el estudiante: ' + error) });
        },
        path: parent => `https://www.udemy.com${parent.path}`
    }
}

export default type;