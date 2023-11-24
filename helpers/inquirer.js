import inquirer from 'inquirer';
 
import colors from 'colors';
 
const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: '1', 
        name:`${'1.'.brightBlue} Crear tarea`
      },
      {
        value: '2', 
        name:`${'2.'.brightBlue} Listar tareas`
      },
      {
        value: '3', 
        name:`${'3.'.brightBlue} Listar tareas completadas`
      },
      {
        value: '4', 
        name:`${'4.'.brightBlue} Listar tareas pendientes`
      },
      {
        value: '5', 
        name:`${'5.'.brightBlue} Completar tarea(s)`
      },
      {
        value: '6', 
        name:`${'6.'.brightBlue} Eliminar tarea(s)`
      },
      {
        value: '0', 
        name:`${'0.'.brightBlue} Salir`
      }
    ]
  }
];


 
const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.brightBlue);
  console.log('   Seleccione una opción'.white);
  console.log('===========================\n'.brightBlue);
 
  const {opcion} = await inquirer.prompt(menuOpts);
 
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'confirmacion',
      message: `Presione ${'ENTER'.blue} para continuar`
    }];
  
  console.log('\n');
  await inquirer.prompt(question);
};
 
const leerInput = async(message) => {

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value){
        if (value.length === 0){
          return 'Por favor ingrese un valor'
        }
        return true;
      }
    }
  ];

const {desc} = await inquirer.prompt(question);
return desc
};

const listadoTareasBorrar = async(tareas = []) =>{
  const choices = tareas.map((tarea, i) => {
    const idx = `${i+1}`.brightBlue 
    const {id,desc} = tarea

    return {
      value: id,
      name: `${idx} ${desc}`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.brightBlue  + 'Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];

  const {id} = await inquirer.prompt(preguntas);

  return id;
};

const confirmar = async(message) => {
  const question = {
    type: 'confirm',
    name: 'confirmacion',
    message
  }

  const {confirmacion} = await inquirer.prompt(question);
  return confirmacion;
};


const mostrarListadoChecklist = async(tareas = []) =>{

  const choices = tareas.map((tarea, i) => {
    const idx = `${i+1}`.brightBlue 
    const {id,desc, completadoEn} = tarea

    return {
      value: id,
      name: `${idx} ${desc}`,
      checked: (completadoEn) ? true :false
    }
  });

  const pregunta= [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ];

  const {ids} = await inquirer.prompt(pregunta);

  return ids;
};

export { inquirerMenu, pausa, leerInput,listadoTareasBorrar, confirmar ,mostrarListadoChecklist};
