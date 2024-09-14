import { MIN_PASSWORD_LENGTH } from '@/common/constants';

export default {
  'header.links.sign-in': 'Sign in',
  'header.links.sign-up': 'Sign up',
  'header.button.sign-out': 'Sign out',

  'main.welcome': 'Welcome, please sign in.',
  'main.signed-in': 'Welcome back, {name}!',
  'main.title': 'REST/GraphQL client',
  'main.links.rest': 'REST client',
  'main.links.graphql': 'GraphQL client',
  'main.links.history': 'History',
  'main.links.sign-in': 'Sign in',
  'main.links.sign-up': 'Sign up',
  'main.project': 'Project information',
  'main.project-info':
    'Developed as the final assignment for a React course, this project showcases the coordinated effort of three dedicated participants.\nCompleted within a span of four weeks, the application is a result of the team’s hard work and collaboration.\nThe application supports both RESTful and GraphQL APIs, featuring Firebase authentication, request history tracking, and language switching.\nUsers can configure and send requests, view responses.',
  'main.team.name-1': 'Ivan Zhirebny',
  'main.team.role-1': 'Frontend-developer, Team leader',
  'main.team.contributions-1': 'Dev environment setup, Authentication pages, Firebase, GraphQL',
  'main.team.bio-1':
    'Graduated from the Bauman Moscow State Technical University, completed the Frontend Developer program at the HTML Academy',
  'main.team.name-2': 'Vadim Kolymbet',
  'main.team.role-2': 'Frontend-developer',
  'main.team.contributions-2': 'Routing, Internationalization, Testing',
  'main.team.bio-2':
    'Graduated from the Saratov State University, studied at the Faculty of Computer Science and Information Technologies and in the Department of Computer Security and Cryptography Theory. Graduated from layout courses at Frontendblok. Worked as a T-SQL developer',
  'main.team.name-3': 'Aleksandra Bodnar',
  'main.team.role-3': 'Frontend-developer, Scrum-master',
  'main.team.contributions-3': 'Design, Jira, MUI, REST, History page, Welcome page',
  'main.team.bio-3':
    'Graduated from the Immanuel Kant Baltic Federal University, studied at the Faculty of Business Informatics. Graduated from 3WC courses with a degree in Frontend-development. Built PHP-driven features for 1C CRM',
  'main.rs-1':
    'RSSchool is an online educational community focused on web development and programming, offering well-structured courses for both beginners and experienced developers.',
  'main.rs-2':
    'Renowned for its high-quality education, RSSchool provides a comprehensive curriculum covering everything from basic HTML, CSS, and JavaScript to advanced technologies like React and Node.js. The school emphasizes project-based learning, enabling students to build real-world projects and develop impressive portfolios.',
  'main.rs-3':
    'RSSchool thrives on a vibrant community of volunteers, including seasoned developers and alumni, who mentor and support new learners.',

  'teamMember.role': 'Role',
  'teamMember.contributions': 'Contributions',
  'teamMember.bio': 'Short bio',
  'teamMember.techStack': 'Tech stack: ',

  'sign-in.loader': 'Signing in...',
  'sign-in.title': 'Sign in',
  'sign-in.email': 'Email',
  'sign-in.password': 'Password',
  'sign-in.submit': 'Sign in',

  'sign-up.loader': 'Signing up...',
  'sign-up.title': 'Sign up',
  'sign-up.name': 'Name',
  'sign-up.email': 'Email',
  'sign-up.password.title': 'Password',
  'sign-up.password': 'Enter password',
  'sign-up.password.confirm': 'Confirm password',
  'sign-up.submit': 'Sign up',

  'rest.title': 'REST client',
  'rest.endpoint': 'Endpoint URL',
  'rest.params': 'Params',
  'rest.headers': 'Headers',
  'rest.variables': 'Variables',
  'rest.body.title': 'Body: ',
  'rest.body': 'Body',

  'restApi.errors.fetch': 'Failed to fetch the response',
  'restApi.errors.endpoint': 'No endpoint provided',
  'restApi.errors.body': 'Response body contains errors',
  'restApi.errors.unknown': 'Unknown error occurred while making the request',
  'restApi.errors.status': 'Fetch error',

  method: 'Method',

  'clientTable.hide': 'Hide',
  'clientTable.show': 'Show',
  'clientTable.key': 'Key',
  'clientTable.value': 'Value',
  'clientTable.row': '+ row',
  'clientTable.delete': 'Delete',

  'requestButton.send': 'Send Request',

  'response.title': 'Response',
  'response.status': 'Status:',
  'response.body': 'Body:',

  'graphql.errors.parse': 'Can’t parse request body in URL',
  'graphql.schema.completed': 'The request has been completed, you can open the schema',
  'graphql.request.completed': 'The request has been completed, check the response field',
  'graphql.title': 'GraphQL client',
  'graphql.endpoint': 'Endpoint URL',
  'graphql.schema': 'Schema URL',
  'graphql.request': 'Request',
  'graphql.schema.request': 'Schema request',
  'graphql.schema.hide': 'Hide schema',
  'graphql.schema.show': 'Show schema',
  'graphql.params': 'Params',
  'graphql.query.title': 'Query: ',
  'graphql.query': 'Query',
  'graphql.headers': 'Headers',
  'graphql.variables.title': 'Variables: ',
  'graphql.variables': 'Variables',

  'schema.title': 'Schema docs:',

  'graphQlApi.response-errors.endpoint': 'No endpoint or query provided',
  'graphQlApi.response-errors.variables': 'Variables field is not valid JSON',
  'graphQlApi.response-errors.data': 'Unknown response structure: no "data" field. Check endpoint and request params',
  'graphQlApi.response-errors.unknown': 'Unknown error occurred while making the request',
  'graphQlApi.response-errors.status': 'Fetch error',

  'graphQlApi.schema-errors.endpoint': 'No schema endpoint provided',
  'graphQlApi.schema-errors.body': 'Schema docs response body contains errors',
  'graphQlApi.schema-errors.data':
    'Unknown response structure: no "data" or "__schema" fields. Check endpoint and headers',
  'graphQlApi.schema-errors.fetch-status': 'Schema docs fetch failed with status code: {status}',
  'graphQlApi.schema-errors.unknown': 'Unknown error occurred while making the schema request',

  'history.title': 'History',
  'history.empty.title': 'You haven’t executed any requests',
  'history.empty': 'It’s empty here. Try: ',
  'history.links.rest': 'REST client',
  'history.links.graphql': 'GraphQL client',
  'history.subtitle': 'Requests:',

  'error.title': 'Oops!',
  'error.text': 'Sorry, an unexpected error has occurred.',
  'error.desc': 'Error message:',
  'error.recommendation': 'Please try to refresh the page.',
  'error.refresh': 'Refresh the page',

  '404.message': 'The page you requested was not found.',
  '404.back': 'Previous page',
  '404.main': 'Main page',

  'auth.loading': 'Loading Firebase...',
  'auth.expired': 'Your token has expired, please sign in again',
  'auth.redirect': 'Redirecting...',

  'firebase.sign-out.success': 'You have been signed out. History of requests are cleared!',
  'firebase.sign-in.success': 'Successfully signed in with {email}!',
  'firebase.sign-up.success': 'Successfully signed up {name}!',
  'firebase.errors.USER_DISABLED': 'User disabled',
  'firebase.errors.INVALID_LOGIN_CREDENTIALS': 'Invalid credentials',
  'firebase.errors.EMAIL_EXISTS': 'Email already in use',
  'firebase.errors.TOO_MANY_ATTEMPTS_TRY_LATER': 'Too many authentication requests',
  'firebase.errors.NETWORK_REQUEST_FAILED': 'Network request failed',

  'validation.email.required': 'Email is required',
  'validation.email.format': 'Email must have valid format',
  'validation.password.required': 'Password is required',
  'validation.password.number': 'Password must contain a number',
  'validation.password.uppercase': 'Password must contain an uppercase letter',
  'validation.password.lowercase': 'Password must contain a lowercase letter',
  'validation.password.special': 'Password must contain one of: -+/%*:#@\\$!?|^&',
  'validation.password.min': `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  'validation.name.required': 'Name is required',
  'validation.name.capital': 'Name must start with a capital letter',
  'validation.confirm.required': 'Please confirm your password',
  'validation.confirm.match': 'Passwords do not match',

  'customTextarea.prettifyError': 'Failed to prettify code. Check {language} syntax',
  'customTextarea.show': 'Show',
  'customTextarea.hide': 'Hide',
  'customTextarea.plainText': 'Plain text',
} as const;
