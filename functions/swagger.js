import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'E-Commerce API',
    description:
      'This is a RESTful API developed to manage an E-Commerce system. It provides endpoints for authentication, company management, product categories, product catalog, payment methods, and order processing.',
  },
  servers: [
    {
      url: 'http://127.0.0.1:5001/e-commerce-185c0/us-central1/api',
      description: 'Dev',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      login: {
        $email: 'user@mail.com',
        $password: '123456',
      },
      recovery: {
        $email: 'user@mail.com',
      },
      User: {
        id: '2mkre4j5gPo0BFGl5pyi',
        name: 'John Doe',
        email: 'johndoe@mail.com',
      },
      addUser: {
        $name: 'John Doe',
        $email: 'johndoe@mail.com',
        $password: '123456',
      },
      updateUser: {
        $name: 'John Doe',
        $email: 'johndoe@mail.com',
        password: '654321',
      },
      addCompany: {
        $logo: '...base64...',
        $document: '15647055000165',
        $corporateName: 'Jornada Dev Media Digital Solutions Ltda',
        $tradeName: 'Dev Journey',
        $phone: '64999999999',
        $businessHours: 'Mon to Fri from 08:00 to 18:00',
        $address: '123 Future St, Downtown',
        $location: 'https://maps.app.goo.gl/example',
        $deliveryFee: 9.99,
        isActive: true,
      },
      updateCompany: {
        $logo: '...base64 or URI...',
        $document: '15647055000165',
        $corporateName: 'Jornada Dev Media Digital Solutions Ltda',
        $tradeName: 'Dev Journey',
        $phone: '64999999999',
        $businessHours: 'Mon to Fri from 08:00 to 18:00',
        $address: '123 Future St, Downtown',
        $location: 'https://maps.app.goo.gl/example',
        $deliveryFee: 9.99,
        $isActive: true,
      },
      addCategory: {
        $description: 'Imported',
        isActive: true,
      },
      updateCategory: {
        $description: 'National',
        $isActive: false,
      },
      addProduct: {
        $name: "Smart TV Samsung 55'",
        description: 'One of the best smart TVs on the market.',
        $price: 5479.99,
        image: null,
        $category: {
          $id: '2mkre4j5gPo0BFGl5pyi',
        },
        isActive: true,
      },
      updateProduct: {
        $name: "Smart TV Samsung 55'",
        description: 'One of the best smart TVs on the market.',
        $price: 5479.99,
        image: null,
        $category: {
          $id: '2mkre4j5gPo0BFGl5pyi',
        },
        $isActive: false,
      },
      addPaymentMethod: {
        $description: 'Pix',
        isActive: true,
      },
      updatePaymentMethod: {
        $description: 'Credit Card',
        $isActive: false,
      },
      addOrder: {
        $company: {
          $id: '1SBiiMrf4JUUFG57M76F',
        },
        $customer: {
          $name: 'John Doe',
          $phone: '11999999999',
        },
        address: {
          zipcode: '75900000',
          $street: 'Xuxu Beleza St',
          $number: '11',
          $neighborhood: 'XPTO District',
          $complement: 'Block 1, Lot 2',
          $city: 'Sampletown',
          $state: 'CA',
        },
        taxpayerId: null,
        $isDelivery: true,
        $paymentMethod: {
          $id: 'NdmCoYl0iT3gHwhO0pyQ',
        },
        $deliveryFee: 100,
        $items: [
          {
            $product: {
              $id: '3UfzI8CSCaK5eC0UJ8gI',
            },
            $quantity: 1,
            note: null,
          },
        ],
        status: {
          '@enum': ['pending', null],
        },
        notes: null,
      },
      updateOrderStatus: {
        $status: {
          '@enum': ['approved', 'delivering', 'completed', 'cancelled'],
        },
      },
    },
    parameters: {
      companyId: {
        name: 'companyId',
        in: 'query',
        description: 'Company ID',
        schema: {
          type: 'string',
        },
      },
      startDate: {
        name: 'startDate',
        in: 'query',
        description: 'Start date in YYYY-MM-DD format',
        schema: {
          type: 'string',
          format: 'date',
        },
      },
      endDate: {
        name: 'endDate',
        in: 'query',
        description: 'End date in YYYY-MM-DD format',
        schema: {
          type: 'string',
          format: 'date',
        },
      },
      orderStatus: {
        name: 'status',
        in: 'query',
        description: 'Order status',
        schema: {
          type: 'string',
          enum: ['pending', 'approved', 'delivering', 'completed', 'cancelled'],
        },
      },
    },
  },
  tags: [
    {
      name: 'Auth',
      description: 'User authentication',
    },
    {
      name: 'Users',
      description: 'User management',
    },
    {
      name: 'Companies',
      description: 'Company management',
    },
    {
      name: 'Categories',
      description: 'Product category management',
    },
    {
      name: 'Products',
      description: 'Company product catalog',
    },
    {
      name: 'Payment Methods',
      description: 'Payment method management',
    },
    {
      name: 'Orders',
      description: 'Order processing and management',
    },
  ],
}

const outputFile = './src/docs/swagger-output.json'
const routes = ['./src/routes/index.ts']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc)
