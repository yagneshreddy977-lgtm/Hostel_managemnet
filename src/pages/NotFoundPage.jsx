import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import '../components/components.css';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '40px 20px',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary-light, #e0e7ff)',
        color: 'var(--color-primary, #4f46e5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
      }}>
        <Compass size={40} />
      </div>

      <span style={{
        fontSize: '13px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'var(--color-primary, #4f46e5)',
        marginBottom: '8px',
      }}>
        404 Error
      </span>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: 'var(--color-text-main, #1e293b)',
        margin: '0 0 12px 0',
      }}>
        Page Not Found
      </h1>

      <p style={{
        maxWidth: '480px',
        fontSize: '15px',
        color: 'var(--color-text-muted, #64748b)',
        lineHeight: 1.6,
        marginBottom: '28px',
      }}>
        The campus service portal link you followed does not exist or may have been moved. You can return to the dashboard to continue.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          variant="primary"
          icon={Home}
          onClick={() => navigate('/student')}
        >
          Resident Dashboard
        </Button>
      </div>
    </div>
  );
}

export default NotFoundPage;
