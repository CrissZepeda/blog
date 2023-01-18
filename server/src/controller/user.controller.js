import { connectFireBase, disconnectFireBase } from '../database/connection.js'
import bcrypt from 'bcrypt'

export const newUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)

    const db = await connectFireBase()
    const collectionName = 'users'

    db.listCollections()
      .then((collections) => {
        const collectionExists = collections.some(
          (collection) => collection.id === collectionName,
        )
        if (collectionExists) {
          db.collection(collectionName)
            .add({
              name,
              username,
              email,
              contraseña: encryptedPassword,
            })
            .then((response) => {
              disconnectFireBase()
              res.status(201).json({
                message: 'Usuario creado con exito.',
              })
            })
            .catch((error) => {
              disconnectFireBase()
              res.status(500).json({ message: 'Error al crear usuario.' })
            })
        } else {
          db.collection(collectionName)
            .add({ name, username, email, contraseña: encryptedPassword })
            .then(function (docRef) {
              disconnectFireBase()
              res.send({
                message: 'Collection y Document creados correctamente ',
              })
            })
            .catch(function (error) {
              console.error('Error creando collection y document: ', error)
            })
        }
      })
      .catch(function (error) {
        console.error('Error listando colecciones: ', error)
      })

    /* db.collection('users')
      .add({ name, username, email, contraseña: encryptedPassword, post: '' })
      .then((response) => {
        disconnectFireBase()
        res.status(201).json({
          message: 'Usuario creado con exito.',
        })
      })
      .catch((error) => {
        disconnectFireBase()
        res.status(500).json({ message: 'Error al crear usuario.' })
      }) */
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const allUser = async (req, res) => {
  try {
    const db = await connectFireBase()

    const result = await db.collection('users').get()
    disconnectFireBase()

    const datos = result.docs.map((doc) => ({
      id: doc.id,
      /* name: doc.data().name,
      username: doc.data().username, */
      ...doc.data(),
    }))

    //disconnectFireBase()

    console.log(datos)
    res.json(datos)
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const oneUser = async (req, res) => {
  try {
    const db = await connectFireBase()
    console.log(req.params.id)

    const resultGet = await db.collection('users').doc(req.params.id).get()
    disconnectFireBase()

    const datos = {
      id: resultGet.id,
      ...resultGet.data(),
    }
    res.json(datos)
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const db = await connectFireBase()
    console.log(req.params.id)

    await db
      .collection('users')
      .doc(req.params.id)
      .delete()
      .then((response) => {
        disconnectFireBase()
        res.status(204).json({ message: 'Eliminado correctamente.' })
      })
      .catch((error) => {
        disconnectFireBase()
        res.status(500).json({ message: '¡Error! problemas con el servidor.' })
      })
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const db = await connectFireBase()
    console.log(req.params.id)
    console.log(req.body)

    await db
      .collection('users')
      .doc(req.params.id)
      .update(req.body)
      .then((response) => {
        disconnectFireBase()
        res.status(204).json({ message: 'Actualizado correctamente.' })
      })
      .catch((error) => {
        disconnectFireBase()
        res.status(500).json({ message: '¡Error! problemas con el servidor.' })
      })
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}
