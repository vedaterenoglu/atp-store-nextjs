/**
 * MSW Request Handlers for Integration Tests
 *
 * SOLID Principles Applied:
 * - SRP: Each handler has single responsibility
 * - OCP: Easy to extend with new handlers
 * - DIP: Handlers depend on MSW abstractions
 *
 * Design Patterns:
 * - Factory Pattern: Handler creation
 * - Strategy Pattern: Different response strategies
 */

import { http, HttpResponse, graphql } from 'msw'

// API endpoints
const CLERK_API_URL = 'https://api.clerk.dev/v1'
const HASURA_GRAPHQL_URL = 'http://mock-hasura.test/v1/graphql'

// Mock user data
export const mockUser = {
  id: 'user_test_123',
  email_addresses: [
    {
      id: 'email_123',
      email_address: 'test@example.com',
      verification: { status: 'verified' },
    },
  ],
  first_name: 'Test',
  last_name: 'User',
  image_url: 'https://example.com/avatar.jpg',
  created_at: 1234567890,
  updated_at: 1234567890,
}

export const mockSession = {
  id: 'session_test_123',
  user_id: mockUser.id,
  status: 'active',
  expire_at: 1234567890 + 86400000, // 24 hours from creation
  abandon_at: 1234567890 + 604800000, // 7 days from creation
}

// Handlers for different test scenarios
export const handlers = [
  // Clerk user endpoint
  http.get(`${CLERK_API_URL}/users/:userId`, ({ params }) => {
    if (params['userId'] === mockUser.id) {
      return HttpResponse.json(mockUser)
    }
    return HttpResponse.json({ error: 'User not found' }, { status: 404 })
  }),

  // Clerk session endpoint
  http.get(`${CLERK_API_URL}/sessions/:sessionId`, ({ params }) => {
    if (params['sessionId'] === mockSession.id) {
      return HttpResponse.json(mockSession)
    }
    return HttpResponse.json({ error: 'Session not found' }, { status: 404 })
  }),

  // Clerk client endpoint (for initial load)
  http.get(`${CLERK_API_URL}/client`, () => {
    return HttpResponse.json({
      sessions: [],
      user: null,
    })
  }),

  // Clerk environment endpoint (required for ClerkProvider initialization)
  http.get(
    'https://charmed-primate-18.clerk.accounts.dev/npm/@clerk/clerk-js@latest/dist/clerk.browser.js',
    () => {
      return new HttpResponse('', { status: 200 })
    }
  ),

  // Clerk dev browser endpoint
  http.get(
    'https://charmed-primate-18.clerk.accounts.dev/v1/dev_browser',
    () => {
      return HttpResponse.json({
        id: 'dev_browser_test',
        status: 'enabled',
      })
    }
  ),

  // Clerk client endpoint for the specific instance
  http.get('https://charmed-primate-18.clerk.accounts.dev/v1/client', () => {
    return HttpResponse.json({
      sessions: [],
      user: null,
      sign_in: null,
      sign_up: null,
    })
  }),

  // i18n translation files
  http.get('/locales/:lng/:ns.json', ({ params }) => {
    const translations: Record<
      string,
      Record<string, Record<string, string>>
    > = {
      en: {
        common: {
          'app.name': 'Portfolio Events',
          'app.description': 'Discover amazing events in your city',
          'navigation.home': 'Home',
          'navigation.events': 'Events',
          'navigation.cities': 'Cities',
          'navigation.dashboard': 'Dashboard',
          'actions.save': 'Save',
          'actions.cancel': 'Cancel',
        },
      },
      sv: {
        common: {
          'app.name': 'Portfolio Events',
          'app.description': 'Upptäck fantastiska evenemang i din stad',
          'navigation.home': 'Hem',
          'navigation.events': 'Evenemang',
          'navigation.cities': 'Städer',
          'navigation.dashboard': 'Instrumentpanel',
          'actions.save': 'Spara',
          'actions.cancel': 'Avbryt',
        },
      },
      tr: {
        common: {
          'app.name': 'Portfolio Events',
          'app.description': 'Şehrinizdeki harika etkinlikleri keşfedin',
          'navigation.home': 'Ana Sayfa',
          'navigation.events': 'Etkinlikler',
          'navigation.cities': 'Şehirler',
          'navigation.dashboard': 'Kontrol Paneli',
          'actions.save': 'Kaydet',
          'actions.cancel': 'İptal',
        },
      },
    }

    const { lng, ns } = params as { lng: string; ns: string }
    const translation = translations[lng]?.[ns]

    if (translation) {
      return HttpResponse.json(translation)
    }

    return HttpResponse.json({}, { status: 404 })
  }),

  // Hasura GraphQL endpoint
  graphql
    .link(HASURA_GRAPHQL_URL)
    .query('GetCategoriesQuery', ({ request }) => {
      // Check for admin secret header
      const adminSecret = request.headers.get('x-hasura-admin-secret')

      if (!adminSecret) {
        return HttpResponse.json(
          {
            errors: [{ message: 'x-hasura-admin-secret required' }],
          },
          { status: 401 }
        )
      }

      // Return mock categories data
      return HttpResponse.json({
        data: {
          _type_stock_groups: [
            {
              stock_groups: '1000 - Pizzakartonger',
              our_company: 'alfe',
            },
            {
              stock_groups: '1500 - Wellpap & Smörpapper',
              our_company: 'alfe',
            },
            {
              stock_groups: '1600 - Hygienpapper',
              our_company: 'alfe',
            },
            {
              stock_groups: '2000 - Bägare',
              our_company: 'alfe',
            },
            {
              stock_groups: '2500 - Micro- & Sallad Förpackningar',
              our_company: 'alfe',
            },
            {
              stock_groups: '3000 - Avhämtningslådor PAP/BAGASSE',
              our_company: 'alfe',
            },
            {
              stock_groups: '4000 - Servetter & Ljus',
              our_company: 'alfe',
            },
            {
              stock_groups: '5000 - Folie & Film',
              our_company: 'alfe',
            },
            {
              stock_groups: '6000 - Rengöringskem. & Rengöringstillbehör',
              our_company: 'alfe',
            },
            {
              stock_groups: '7000 - Kassa & Babs',
              our_company: 'alfe',
            },
            {
              stock_groups: '8000 - Bärkassar & Säckar',
              our_company: 'alfe',
            },
            {
              stock_groups: '8500 - Engångs produkter',
              our_company: 'alfe',
            },
            {
              stock_groups: '9000 - Aluminiumformar & Serveringsfat',
              our_company: 'alfe',
            },
          ],
        },
      })
    }),

  // Generic Hasura GraphQL handler for other queries/mutations
  graphql.link(HASURA_GRAPHQL_URL).operation(({ request }) => {
    // Check for admin secret header
    const adminSecret = request.headers.get('x-hasura-admin-secret')

    if (!adminSecret) {
      return HttpResponse.json(
        {
          errors: [{ message: 'x-hasura-admin-secret required' }],
        },
        { status: 401 }
      )
    }

    // Return empty data for unknown operations (can be extended)
    return HttpResponse.json({
      data: null,
    })
  }),
]

// Authenticated user handlers
export const authenticatedHandlers = [
  ...handlers,
  // Override client endpoint for authenticated state
  http.get(`${CLERK_API_URL}/client`, () => {
    return HttpResponse.json({
      sessions: [mockSession],
      user: mockUser,
      last_active_session_id: mockSession.id,
    })
  }),
]

// Error handlers for testing error scenarios
export const errorHandlers = [
  http.get(`${CLERK_API_URL}/client`, () => {
    return HttpResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }),

  http.get('/locales/:lng/:ns.json', () => {
    return HttpResponse.json(
      { error: 'Translation service unavailable' },
      { status: 503 }
    )
  }),
]
