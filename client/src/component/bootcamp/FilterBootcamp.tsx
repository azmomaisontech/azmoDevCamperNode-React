import React from "react";
import { FormEventProps } from "../../context/type";
interface Props {
  handleSubmit: (e: FormEventProps) => void;
  handleChange: (e: FormEventProps) => void;
  rating: number;
  budget: number;
}

const FilterBootcamp: React.FC<Props> = (props) => {
  const { handleSubmit, handleChange, rating, budget } = props;
  return (
    <div className="filter">
      <form onSubmit={handleSubmit} className="rating">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select name="rating" onChange={handleChange} value={rating}>
            <option value="1">Any</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <select name="budget" onChange={handleChange} value={budget}>
            <option value="100000">Any</option>
            <option value="20000">$20000</option>
            <option value="15000">$15000</option>
            <option value="10000">$10000</option>
            <option value="8000">$8000</option>
            <option value="6000">$6000 </option>
            <option value="4000">$4000</option>
            <option value="2000">$2000</option>
          </select>
        </div>
        <input
          type="submit"
          className="btn
        btn-primary
        btn-block"
          value="Filter Bootcamps"
        />
      </form>
    </div>
  );
};

export default FilterBootcamp;
