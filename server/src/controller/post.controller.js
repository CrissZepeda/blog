import { connectFireBase, disconnectFireBase } from '../database/connection.js'

export const newPostInUser = async (req, res) => {
  try {
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const db = await connectFireBase()
    const docParent = db.collection('users').doc(req.params.id)

    docParent
      .add({
        post: {
          publicacion: date.toLocaleDateString('en-US', options),
          ...req.body,
        },
      })
      .then((response) => {
        disconnectFireBase()
        res.status(201).json({
          message: 'publicacion creada con exito.',
        })
      })
      .catch((error) => {
        disconnectFireBase()
        res.status(500).json({ message: 'Error al crear publicacion.' })
      })
  } catch (error) {
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const newPost = async (req, res) => {
  try {
    const db = await connectFireBase()

    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }

    const collectionName = 'posts'

    db.listCollections()
      .then((collections) => {
        const collectionExists = collections.some(
          (collection) => collection.id === collectionName,
        )
        if (collectionExists) {
          db.collection('posts')
            .add({
              idUser: req.params.id,
              ...req.body,
              published: date.toLocaleDateString('en-US', options),
            })
            .then((response) => {
              disconnectFireBase()
              res.status(201).json({
                message: 'Post creado con exito.',
              })
            })
            .catch((error) => {
              disconnectFireBase()
              res.status(500).json({ message: 'Error al crear post.' })
            })
        } else {
          db.collection(collectionName)
            .add({
              idUser: req.params.id,
              ...req.body,
              published: date.toLocaleDateString('es-ES', options),
            })
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
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const allPost = async (req, res) => {
  try {
    const db = await connectFireBase()

    const result = await db.collection('posts').get()

    const datos = result.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    disconnectFireBase()

    console.log(datos)
    // return res.json(datos)
    return datos
      ? res.json(datos)
      : res.status(200).send('No existen registros')
  } catch (error) {
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const onePost = async (req, res) => {
  try {
    console.log(req.params.id)
    const db = await connectFireBase()

    const resultGet = await db.collection('posts').doc(req.params.id).get()

    disconnectFireBase()
    const datos = {
      id: resultGet.id,
      ...resultGet.data(),
    }
    console.log(datos)
    return res.json(datos)
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const onePostbyUserId = async (req, res) => {
  try {
    const db = await connectFireBase()
    console.log(req.params.id)
    const field = 'idUser'

    const resultGet = await db
      .collection('posts')
      .where(field, '==', req.params.id)
      .get()

    disconnectFireBase()

    const datos = resultGet.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    console.log(datos)

    res.json(datos)
  } catch (error) {
    disconnectFireBase()
    res.status(500).json({ message: '¡Error! problemas con el servidor.' })
  }
}

export const deletePost = async (req, res) => {
  try {
    const db = await connectFireBase()
    console.log(req.params.id)

    await db
      .collection('posts')
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

export const updatePost = async (req, res) => {
  try {
    const db = await connectFireBase()

    await db
      .collection('posts')
      .doc(req.params.id)
      .update(req.body)
      .then((response) => {
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
