import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockTokenResponse = { token: 'test-token-12345' };
  const apiUrl = 'https://reqres.in/api/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should make HTTP POST request with correct parameters', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe();

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email, password });
      expect(req.request.headers.get('x-api-key')).toBe('reqres-free-v1');

      req.flush(mockTokenResponse);
    });

    it('should return true when login is successful and store token', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe(result => {
        expect(result).toBe(true);
        expect(localStorage.getItem('authToken')).toBe('test-token-12345');
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush(mockTokenResponse);
    });

    it('should return false when login fails (no token in response)', () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';

      service.login(email, password).subscribe(result => {
        expect(result).toBe(false);
        expect(localStorage.getItem('authToken')).toBeNull();
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush({}); // Response without token
    });

    it('should return false when HTTP request fails', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe(result => {
        expect(result).toBe(false);
        expect(localStorage.getItem('authToken')).toBeNull();
      });

      const req = httpMock.expectOne(apiUrl);
      req.error(new ErrorEvent('Network error'));
    });

    it('should handle HTTP error and return false', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe(result => {
        expect(result).toBe(false);
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Error message', { status: 400, statusText: 'Bad Request' });
    });

    it('should not store token when response has no token', () => {
      const email = 'test@example.com';
      const password = 'password123';

      service.login(email, password).subscribe();

      const req = httpMock.expectOne(apiUrl);
      req.flush({ message: 'Login failed' }); // No token property

      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('logout', () => {
    it('should remove token from localStorage', () => {
      // First set a token
      localStorage.setItem('authToken', 'test-token');
      expect(localStorage.getItem('authToken')).toBe('test-token');

      // Then logout
      service.logout();

      expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('should not throw error when no token exists', () => {
      expect(() => service.logout()).not.toThrow();
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when token exists in localStorage', () => {
      localStorage.setItem('authToken', 'test-token');

      expect(service.isLoggedIn()).toBe(true);
    });

    it('should return false when no token exists in localStorage', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return false when token is empty string', () => {
      localStorage.setItem('authToken', '');

      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return false when token is null', () => {
      localStorage.setItem('authToken', 'null');
      localStorage.removeItem('authToken');

      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('getToken', () => {
    it('should return token when it exists in localStorage', () => {
      const testToken = 'test-token-12345';
      localStorage.setItem('authToken', testToken);

      expect(service.getToken()).toBe(testToken);
    });

    it('should return null when no token exists in localStorage', () => {
      expect(service.getToken()).toBeNull();
    });

    it('should return empty string when token is empty', () => {
      localStorage.setItem('authToken', '');

      expect(service.getToken()).toBe('');
    });
  });
});
