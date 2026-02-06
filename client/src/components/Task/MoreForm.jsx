import { FloatingLabel, Form } from "react-bootstrap";

export default function MoreForm({ formData, setFormData }) {
  return (
    <>
      <FloatingLabel controlId="progress" label="Progress %" className="mb-3">
        <Form.Select
          value={formData.progress}
          onChange={(e) =>
          setFormData({ ...formData, progress: Number(e.target.value) })
          }>
          <option value="" hidden>
            Select progress
          </option>
          {[0, 25, 50, 75, 100].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Form.Control
        as="textarea"
        rows={4}
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
        setFormData({ ...formData, description: e.target.value })
        }
      />
    </>
  );
}
