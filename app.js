import colors from 'colors';
import { inquirerMenu , pausa, leerInput,listadoTareasBorrar, confirmar , mostrarListadoChecklist} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import {guardarDB, leerDB} from './helpers/guardarArchivo.js';
 
console.clear();
 
const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const tareasDB= leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await leerInput('Descripción:');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas();
        break;
      case '4' :
        tareas.listarPendientesCompletadas(false);
        break;
      case '5' :
        const ids= await mostrarListadoChecklist(tareas.listadoArr) ;
        tareas.toggleCompletadas(ids);
        break;
      case '6' :
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== '0'){
            const confirmed = await confirmar('¿Está seguro?')
            if (confirmed){
              tareas.borrarTarea(id);
              console.log('¡Tarea borrada!');
            }
          }
        break;
    }

    guardarDB(tareas.listadoArr);
    await pausa(); 

  } while (opt !== '0');
};
 
main();