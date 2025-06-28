import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';

function CategoryCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Graphic Designer',
    'Full Stack Developer',
    'Java Developer'
  ];

  function searchClick(query) {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  }

  return (
    <div className="px-4 sm:px-6 md:px-0">
      <Carousel className="w-full max-w-6xl mx-auto my-12">
        <CarouselContent>
          {categories.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex justify-center"
            >
              <Button
                onClick={() => searchClick(item)}
                variant="outline"
                className="rounded-full w-full sm:w-auto text-sm sm:text-base"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
