import React, { useEffect, useState } from 'react';
import './style.css';
import GoogleLoginButton from './components/GoogleLoginButton';

/* global google */

function FlightForm() {
  const [form, setForm] = useState({});
  const [userEmail, setUserEmail] = useState('');

      const checklistItems = {
      'Documentation – 2hr prior to flight arrival': [
        'GD / PTP Clearance (Stamped)',
        'Inbound flight irregularities check, MSG check',
        'Build up status and ULD check',
        'Weight check with Dim & Weight sheet, MFST WT vs Actual WT',
        'W/B LIR compare to Deadload sheet'
      ],
      'Pre-flight preparation – 1hr prior to flight arrival': [
        'Confirm cargo info, including DG or special CGO',
        'Confirm ULD/CGO info to be left in transit A/C',
        'Nose Offload Required',
        'Contour of ULD and build up status check (Al.A2.B)'
      ],
      'Confirm items prior to/upon flight arrival': [
        'Confirm ramp conditions, especially to avoid FOD',
        'Confirm all GSE serviceability, if it is full operational',
        'Safe positioning of GSE and ramp staffs (Wing walker)',
        'Confirm safety for A/C spot in',
        'Observe setting GSE to A/C',
        'Check tethering is installed below Taxing light housing conduit [Photo]',
        'Check additional safety cone installed at rear side of A/C'
      ],
      'Confirm items prior to start unloading': [
        'Observe tail stanchion or nose tethering being fixed to A/C',
        'Check cargo condition (leaning, wet, odor, etc) in A/C',
        'Confirm and report damage and malfunction of A/C and equipment (Door Frames, Seal Depressor, Outer skin around the cargo doors and Tail Stanchion Pad, Restraint, PDU, etc) [Photo]',
        'Confirm all GSE is properly aligned / positioned at Aircraft (MD Loader, LD Loader, Belt Loader, Pax Steps)'
      ],
      'Supervision for unloading operations': [
        'Supervise to prevent tail heavy weight condition from concentrating on tail of A/C',
        'Control handling progress and safety. (Special care should be taken on OSC/SHC/SEN)',
        'Check ULD number and contour',
        'Supervise and instruct to handle special cargo',
        'Report irregularity of cargo and handling'
      ],
      'Dangerous Goods': [
        'Check DG for any leakage, odor, or dent to package',
        'Check netting condition and leaning of DG pallets',
        'Check DG tag attached (Both side)'
      ],
      'Confirm items after completion of unloading': [
        'Check equipment in A/C(restraint, PDU, etc)',
        'Report and confirm irregularities of equipment in A/C',
        'Confirm ULD/CGO to be unloaded and ULD/CGO to be left in A/C for transit flight',
        'Confirm all of end locks engaged between ULD and empty position [Photo]'
      ],
      'Additional operation': [
        'Notify to OZ rep when flight crews in/out',
        'Notify to OZ rep when service provider show up (Catering. Fuler, Flight operation, Security, De-icing)'
      ]
    };

  const checklistTitles = Object.keys(checklistItems);

  useEffect(() => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const datetime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;

    const defaultChecks = {};

    const checklistCounts = [5, 4, 7, 4, 5, 3, 4, 2];

    ['in', 'out'].forEach(prefix => {
      checklistTitles.forEach((title, idx) => {
        for (let i = 0; i < checklistCounts[idx]; i++) {
          defaultChecks[`${prefix}-check-${title}-${i}`] = 'Yes';
        }
      });
    });

    setForm(f => ({
      ...f,
      eta: datetime,
      etd: datetime,
      landing: datetime,
      rampin: datetime,
      eta2: datetime,
      etd2: datetime,
      landing2: datetime,
      rampin2: datetime,
      ...defaultChecks
    }));
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = now.getFullYear();
    const mm = pad(now.getMonth() + 1);
    const dd = pad(now.getDate());
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleNowClick = (field) => {
    setForm(prev => ({ ...prev, [field]: getCurrentDateTime() }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const formatEmailBody = () => {
  let result = `Flight Service Check Report\n\n`;

  // 1. Inbound 항공 정보
  result += `=== INBOUND FLIGHT INFO ===\n`;
  result += `Flight Number (IN): ${form.flight_code || ''} ${form.flight_number || ''}\n`;
  result += `ETA: ${form.eta}\nETD: ${form.etd}\nLanding: ${form.landing}\nRamp In: ${form.rampin}\n\n`;

  // 2. Inbound 체크리스트
  result += `=== INBOUND CHECKLIST ===\n\n`;
  Object.entries(checklistItems).forEach(([section, items]) => {
    result += `[${section}]\n`;
    items.forEach((label, idx) => {
      const key = `in-check-${section}-${idx}`;
      result += `${idx + 1}. ${label}: ${form[key] || 'N/A'}\n`;
    });
    result += '\n';
  });

  // 3. Outbound 항공 정보
  result += `=== OUTBOUND FLIGHT INFO ===\n`;
  result += `Flight Number (OUT): ${form.flight_code2 || ''} ${form.flight_number2 || ''}\n`;
  result += `ETA (OUT): ${form.eta2}\nETD (OUT): ${form.etd2}\nLanding (OUT): ${form.landing2}\nRamp In (OUT): ${form.rampin2}\n\n`;

  // 4. Outbound 체크리스트
  result += `=== OUTBOUND CHECKLIST ===\n\n`;
  Object.entries(checklistItems).forEach(([section, items]) => {
    result += `[${section}]\n`;
    items.forEach((label, idx) => {
      const key = `out-check-${section}-${idx}`;
      result += `${idx + 1}. ${label}: ${form[key] || 'N/A'}\n`;
    });
    result += '\n';
  });

  return result;
};




const handleSubmit = (e) => {
  e.preventDefault();

  const airlineCode = form.airline || '';
  const flightNumber = form.flight_number || '';

  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());

  const dateStr = `${yyyy}-${mm}-${dd}`;
  const subject = encodeURIComponent(`Flight Service Check Report - ${airlineCode}${flightNumber} (${dateStr})`);

  const body = encodeURIComponent(
    '복사된 문서를 여기에 붙여넣기(Ctrl+V) 하세요.'
  );

  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`,
    '_blank'
  );
};




  const handleLogout = () => {
    setUserEmail('');
    google.accounts.id.disableAutoSelect();
  };

  const renderChecklist = (prefix, title, items) => (
    <div className="checklist-section" style={{ textAlign: 'left' }}>
      <h3>{title}</h3>
      {items.map((label, index) => (
        <div className="check-item" key={index}>
          <span>{label}</span>
          <label>
            <input
              type="radio"
              name={`${prefix}-check-${title}-${index}`}
              value="Yes"
              onChange={handleChange}
              checked={form[`${prefix}-check-${title}-${index}`] === 'Yes'}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              name={`${prefix}-check-${title}-${index}`}
              value="No"
              onChange={handleChange}
              checked={form[`${prefix}-check-${title}-${index}`] === 'No'}
            /> No
          </label>
        </div>
      ))}
    </div>
  );

  return (
    <form id="flight-form" onSubmit={handleSubmit}>

      <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
        {userEmail ? (
          <>
            <span style={{ fontWeight: 'bold', marginRight: '1rem' }}>Signed in as: {userEmail}</span>
            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <GoogleLoginButton onLoginSuccess={(profile) => setUserEmail(profile.email)} />
        )}
        <h2 className="report-title">Flight Service Check Report - Inbound</h2>
      </div>

          <div style={{ textAlign: 'left' }}>
        <label>Airline Code:</label><br />
        <select name="airline" value={form.airline || 'OZ'} onChange={handleChange}>
          <option value="OZ">OZ</option>
          <option value="KE">KE</option>
          <option value="QR">QR</option>
        </select><br />

        <label>Flight Number:</label><br />
        <input
          type="text"
          name="flight_number"
          value={form.flight_number || ''}
          onChange={handleChange}
          required
        /><br />

        <label>ETA:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="eta"
            value={form.eta || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('eta')}>Now</button>
        </div><br />

        <label>ETD:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="etd"
            value={form.etd || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('etd')}>Now</button>
        </div><br />

        <label>Landing Time:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="landing"
            value={form.landing || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('landing')}>Now</button>
        </div><br />

        <label>Ramp In Time:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="rampin"
            value={form.rampin || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('rampin')}>Now</button>
        </div><br />
      </div>

      {renderChecklist('in','[Documentation] – 2hr prior to flight arrival', [
        '1. GD / PTP Clearance (Stamped):',
        '2. Inbound flight irregularities check, MSG check:',
        '3. Build up status and ULD check:',
        '4. Weight check with Dim & Weight sheet, MFST WT vs Actual WT:',
        '5. W/B LIR compare to Deadload sheet:'
      ])}

      {renderChecklist('in','[Pre-flight preparation] – 1hr prior to flight arrival', [
        '1. Confirm cargo info, including DG or special CGO:',
        '2. Confirm ULD/CGO info to be left in transit A/C:',
        '3. Nose Offload Required:',
        '4. Contour of ULD and build up status check(Al.A2.B):'
      ])}

      {renderChecklist('in','[Confirm items prior to/upon flight arrival]', [
        '1. Confirm ramp conditions, especially to avoid FOD:',
        '2. Confirm all GSE serviceability, if it is full operational:',
        '3. Safe positioning of GSE and ramp staffs (Wing walker):',
        '4. Confirm safety for A/C spot in:',
        '5. Observe setting GSE to A/C:',
        '6. Check tethering is installed below Taxing light housing conduit:',
        '7. Check additional safety cone installed at rear side of A/C:'
      ])}

      {renderChecklist('in','[Confirm items prior to start unloading]', [
        '1. Observe tail stanchion or nose tethering being fixed to A/C:',
        '2. Check cargo condition (leaning, wet, odor, etc) in A/C:',
        '3. Confirm and report damage and malfunction of A/C and equipment (Door Frames, Seal Depressor, Outer skin around the cargo doors and Tail Stanchion Pad, Restraint, PDU, etc):',
        '4. Confirm all GSE is properly aligned / positioned at Aircraft (MD Loader, LD Loader, Belt Loader, Pax Steps):'
      ])}

      {renderChecklist('in','[Supervision for unloading operations]', [
        '1. Supervise to prevent tail heavy weight condition from concentrating on tail of A/C:',
        '2. Control handling progress and safety. (Special care should be taken on OSC/SHC/SEN):',
        '3. Check ULD number and contour:',
        '4. Supervise and instruct to handle special cargo:',
        '5. Report irregularity of cargo and handling:'
      ])}

      {renderChecklist('in','[Dangerous Goods]', [
        '1. Check DG for any leakage, odor, or dent to package:',
        '2. Check netting condition and leaning of DG pallets:',
        '3. Check DG tag attached (Both side):'
      ])}

      {renderChecklist('in','[Confirm items after completion of unloading]', [
        '1. Check equipment in A/C(restraint, PDU, etc):',
        '2. Report and confirm irregularities of equipment in A/C:',
        '3. Confirm ULD/CGO to be unloaded and ULD/CGO to be left in A/C for transit flight:',
        '4. Confirm all of end locks engaged between ULD and empty position:'
      ])}

      {renderChecklist('in','[Additional operation]', [
        '1. Notify to OZ rep when flight crews in/out:',
        '2. Notify to OZ rep when service provider show up (Catering. Fuler, Flight operation, Security, De-icing):'
      ])}

      <br />
      <h2 className="report-title">Flight Service Check Report - Outbound</h2>
          <div style={{ textAlign: 'left' }}>
        <label>Airline Code:</label><br />
        <select name="airline2" value={form.airline2 || 'OZ'} onChange={handleChange}>
          <option value="OZ">OZ</option>
          <option value="KE">KE</option>
          <option value="QR">QR</option>
        </select><br />

        <label>Flight Number:</label><br />
        <input
          type="text"
          name="flight_number2"
          value={form.flight_number2 || ''}
          onChange={handleChange}
          required
        /><br />

        <label>ETA:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="eta2"
            value={form.eta2 || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('eta2')}>Now</button>
        </div><br />

        <label>ETD:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="etd2"
            value={form.etd2 || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('etd2')}>Now</button>
        </div><br />

        <label>Landing Time:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="landing2"
            value={form.landing2 || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('landing2')}>Now</button>
        </div><br />

        <label>Ramp In Time:</label><br />
        <div className="time-input-group">
          <input
            type="datetime-local"
            name="rampin2"
            value={form.rampin2 || ''}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={() => handleNowClick('rampin2')}>Now</button>
        </div><br />
      </div>

      {renderChecklist('out','[Documentation] – 2hr prior to flight arrival', [
        '1. GD / PTP Clearance (Stamped):',
        '2. Inbound flight irregularities check, MSG check:',
        '3. Build up status and ULD check:',
        '4. Weight check with Dim & Weight sheet, MFST WT vs Actual WT:',
        '5. W/B LIR compare to Deadload sheet:'
      ])}

      {renderChecklist('out','[Pre-flight preparation] – 1hr prior to flight arrival', [
        '1. Confirm cargo info, including DG or special CGO:',
        '2. Confirm ULD/CGO info to be left in transit A/C:',
        '3. Nose Offload Required:',
        '4. Contour of ULD and build up status check(Al.A2.B):'
      ])}

      {renderChecklist('out','[Confirm items prior to/upon flight arrival]', [
        '1. Confirm ramp conditions, especially to avoid FOD:',
        '2. Confirm all GSE serviceability, if it is full operational:',
        '3. Safe positioning of GSE and ramp staffs (Wing walker):',
        '4. Confirm safety for A/C spot in:',
        '5. Observe setting GSE to A/C:',
        '6. Check tethering is installed below Taxing light housing conduit:',
        '7. Check additional safety cone installed at rear side of A/C:'
      ])}

      {renderChecklist('out','[Confirm items prior to start unloading]', [
        '1. Observe tail stanchion or nose tethering being fixed to A/C:',
        '2. Check cargo condition (leaning, wet, odor, etc) in A/C:',
        '3. Confirm and report damage and malfunction of A/C and equipment (Door Frames, Seal Depressor, Outer skin around the cargo doors and Tail Stanchion Pad, Restraint, PDU, etc):',
        '4. Confirm all GSE is properly aligned / positioned at Aircraft (MD Loader, LD Loader, Belt Loader, Pax Steps):'
      ])}

      {renderChecklist('out','[Supervision for unloading operations]', [
        '1. Supervise to prevent tail heavy weight condition from concentrating on tail of A/C:',
        '2. Control handling progress and safety. (Special care should be taken on OSC/SHC/SEN):',
        '3. Check ULD number and contour:',
        '4. Supervise and instruct to handle special cargo:',
        '5. Report irregularity of cargo and handling:'
      ])}

      {renderChecklist('out','[Dangerous Goods]', [
        '1. Check DG for any leakage, odor, or dent to package:',
        '2. Check netting condition and leaning of DG pallets:',
        '3. Check DG tag attached (Both side):'
      ])}

      {renderChecklist('out','[Confirm items after completion of unloading]', [
        '1. Check equipment in A/C(restraint, PDU, etc):',
        '2. Report and confirm irregularities of equipment in A/C:',
        '3. Confirm ULD/CGO to be unloaded and ULD/CGO to be left in A/C for transit flight:',
        '4. Confirm all of end locks engaged between ULD and empty position:'
      ])}

      {renderChecklist('out','[Additional operation]', [
        '1. Notify to OZ rep when flight crews in/out:',
        '2. Notify to OZ rep when service provider show up (Catering. Fuler, Flight operation, Security, De-icing):'
      ])}

      <br />
            <button type="button" onClick={() => {
        navigator.clipboard.writeText(formatEmailBody())
          .then(() => alert('✂️ 복사 완료! 메일에 붙여넣기 하세요.'))
          .catch(err => alert('❌ 복사 실패: ' + err));
      }}>
        📋 내용 복사 (Text Copy)
      </button><br></br>
      <button type="submit">SUBMIT</button>
    </form>
  );
}


export default FlightForm;