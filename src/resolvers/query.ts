import { IResolvers } from 'graphql-tools';
import { CursoModel } from '../data/curso';
import { StudentModel } from '../data/student';

const query: IResolvers = {
    Query: {
        estudiantes(): any {
            return StudentModel.find({})
                .then((students) => { return students })
                .catch((error) => { return new Error('Error encontrando el estudiante: ' + error) });
        },
        estudiante(__: void, { id }): any {
            return StudentModel.findOne({ id: id })
                .then((student) => { return student })
                .catch((error) => { return new Error('Error encontrando el estudiante: ' + error) });
        },
        cursos(): any {
            return CursoModel.find({})
                .then((cursos) => { return cursos })
                .catch((error) => { return new Error('Error encontrando el curso: ' + error) });
        },
        curso(__: void, { curso }): any {
            return CursoModel.findOne({ id: curso })
                .then((curso) => { return curso })
                .catch((error) => { return new Error('Error encontrando el curso: ' + error) });
        }
    }
}

export default query;