//db
import path from 'path'
import nedb from 'nedb'

const db = new nedb({
    filename: 'data.db',
    autoload: true
})

export default db
