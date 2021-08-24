import { IResolvers } from 'graphql-tools';
import { CursoModel } from '../data/curso';
import { StudentModel } from '../data/student';

import _ from 'lodash';

const mutation: IResolvers = {
    Mutation: {
        estudianteNuevo(__: void, { estudiante }): any {

            let estudianteNuevo = new StudentModel(estudiante);
            let respuesta = estudianteNuevo.save()
                .then(estudianteGuardado => {
                    console.log("Añadido estudiante: " + estudianteGuardado)
                    return estudianteGuardado;
                }).catch(error => {
                    console.log(error)
                    return new Error('Error añadiendo el curso: ' + error);
                });
            return respuesta
        },
        cursoNuevo(__: void, { curso }): any {
            let cursoNuevo = new CursoModel(curso);
            let respuesta = cursoNuevo.save()
                .then(cursoGuardado => {
                    console.log("Añadido curso: " + cursoGuardado)
                    return cursoGuardado;
                }).catch(error => {
                    console.log(error)
                    return new Error('Error añadiendo el curso: ' + error);
                });
            return respuesta
        },
        modificarCurso(__: void, { curso }): any {
            let respuesta = CursoModel.updateOne({ id: curso.id }, { $set: curso })
                .then(cursoEditado => {
                    console.log("Editado curso con id " + curso.id + " " + cursoEditado)
                    return curso;
                }).catch(error => {
                    console.log(error)
                    return new Error('Error borrando el curso: ' + error);
                });
            return respuesta
        },
        eliminarCurso(__: void, { id }): any {
            let respuesta = CursoModel.remove({ id: id })
                .then(cursoBorrado => {
                    console.log("Eliminado curso: " + id + " " + cursoBorrado)
                    return {
                        id: '-1',
                        title: '',
                        description: 'Eliminado con exito',
                        clases: -1,
                        time: 0.0,
                        level: 'TODOS',
                        logo: '',
                        path: '',
                        teacher: '',
                        reviews: []
                    };
                }).catch(error => {
                    console.log(error)
                    return new Error('Error borrando el curso: ' + error);
                });
            return respuesta
        }
    }
}

export default mutation;
