exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', tbl => {
        tbl.increments();
        tbl
            .string('name', 128)
            .notNullable()
            .unique()
        tbl
            .string('description')
            .notNullable()
        tbl
            .string('notes')
        tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('CASCADE')
        tbl 
            .boolean('completed')
        tbl.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions')
};