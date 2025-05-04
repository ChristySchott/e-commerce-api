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
        email: 'user@mail.com',
        password: '123456',
      },
      recovery: {
        email: 'user@mail.com',
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
      Company: {
        id: 'abc123',
        logo: '...base64 or URI...',
        document: '15647055000165',
        corporateName: 'Example Ltda',
        tradeName: 'Example',
        phone: '11999999999',
        businessHours: 'Mon to Fri from 08:00 to 18:00',
        address: '123 Future St, Downtown',
        location: 'https://maps.example.com',
        deliveryFee: 9.99,
        isActive: true,
      },
      addCompany: {
        $logo: '...base64...',
        $document: '15647055000165',
        $corporateName: 'Example Ltda',
        $tradeName: 'Example',
        $phone: '11999999999',
        $businessHours: 'Mon to Fri from 08:00 to 18:00',
        $address: '123 Future St, Downtown',
        $location: 'https://maps.example.com',
        $deliveryFee: 9.99,
        isActive: true,
      },
      updateCompany: {
        $logo: '...base64 or URI...',
        $document: '15647055000165',
        $corporateName: 'Example Ltda',
        $tradeName: 'Example',
        $phone: '11999999999',
        $businessHours: 'Mon to Fri from 08:00 to 18:00',
        $address: '123 Future St, Downtown',
        $location: 'https://maps.example.com',
        $deliveryFee: 9.99,
        isActive: true,
      },
      Category: {
        id: 'cat123',
        description: 'Imported',
        isActive: true,
      },
      addCategory: {
        $description: 'Imported',
        isActive: true,
      },
      updateCategory: {
        $description: 'National',
        isActive: false,
      },
      Product: {
        id: 'prod123',
        name: "Smart TV Samsung 55'",
        description: 'One of the best smart TVs on the market.',
        price: 5479.99,
        image: 'https://example.com/image.png',
        category: {
          id: 'cat123',
          description: 'Electronics',
          isActive: true,
        },
        isActive: true,
      },
      addProduct: {
        $name: "Smart TV Samsung 55'",
        $description: 'One of the best smart TVs on the market.',
        $price: 5479.99,
        image: null,
        $category: {
          $id: 'cat123',
        },
        isActive: true,
      },
      updateProduct: {
        name: "Smart TV Samsung 55'",
        description: 'Updated product description.',
        price: 5479.99,
        image: null,
        category: {
          id: 'cat123',
        },
        isActive: false,
      },
      PaymentMethod: {
        id: 'pay123',
        description: 'Credit Card',
        isActive: true,
      },
      addPaymentMethod: {
        description: 'Pix',
        isActive: true,
      },
      updatePaymentMethod: {
        description: 'Credit Card',
        isActive: false,
      },
      Address: {
        zipcode: '75900000',
        street: 'Xuxu Beleza St',
        number: '11',
        neighborhood: 'XPTO District',
        complement: 'Block 1, Lot 2',
        city: 'Sampletown',
        uf: 'CA',
      },
      Customer: {
        name: 'John Doe',
        phone: '11999999999',
      },
      OrderItem: {
        product: { $ref: '#/components/schemas/Product' },
        quantity: 1,
        note: 'No onions',
      },
      Order: {
        id: 'order123',
        company: { $ref: '#/components/schemas/Company' },
        customer: { $ref: '#/components/schemas/Customer' },
        address: { $ref: '#/components/schemas/Address' },
        taxpayerId: '12345678901',
        date: '2024-05-01T12:00:00Z',
        isDelivery: true,
        deliveryFee: 100,
        paymentMethod: { $ref: '#/components/schemas/PaymentMethod' },
        items: [{ $ref: '#/components/schemas/OrderItem' }],
        status: 'pending',
        notes: 'Leave at the front door',
      },
      addOrder: {
        $company: {
          $id: 'comp123',
        },
        $customer: {
          $name: 'John Doe',
          $phone: '11999999999',
        },
        $address: {
          $zipcode: '75900000',
          $street: 'Xuxu Beleza St',
          $number: '11',
          $neighborhood: 'XPTO District',
          complement: 'Block 1, Lot 2',
          $city: 'Sampletown',
          $uf: 'CA',
        },
        taxpayerId: null,
        isDelivery: true,
        $paymentMethod: {
          $id: 'pay123',
        },
        $deliveryFee: 100,
        $items: [
          {
            $product: {
              $id: 'prod123',
            },
            $quantity: 1,
            note: null,
          },
        ],
        status: 'pending',
        notes: null,
      },
      updateOrderStatus: {
        $status: {
          type: 'string',
          enum: ['approved', 'delivering', 'completed', 'cancelled'],
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
