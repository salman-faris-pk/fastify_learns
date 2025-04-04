
export const userSchema = {
    create: {
      type: 'object',
      required: ['name','email','password'],
      properties: {
        name: { type: 'string', minLength: 4 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
      },
    },
    idParam: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  };