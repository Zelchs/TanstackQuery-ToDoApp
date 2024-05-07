import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { fetchCharacters } from '../utils/api';
import CharactersTemplate from '../components/templates/CharactersTemplate';
import Loading from '../components/atoms/Loading';
import Error from '../components/atoms/Error';
import { Input, Select, Space, Typography } from 'antd';
import debounce from 'lodash.debounce';
import {
  FetchCharactersResponse,
  CharacterWithIndexSignature,
} from '../utils/types';

const { Option } = Select;
const { Text } = Typography;

const CharactersPage: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('name');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>(
    () => localStorage.getItem('sortOrder') || ''
  );
  const [filters, setFilters] = useState<Record<string, string>>({});

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedUpdateFilters = useMemo(
    () =>
      debounce((newFilters: Record<string, string>) => {
        setFilters(newFilters);
      }, 500),
    []
  );

  const updateFilters = useCallback(
    (newFilters: Record<string, string>) => {
      debouncedUpdateFilters(newFilters);
    },
    [debouncedUpdateFilters]
  );

  const queryFn = ({
    pageParam = '1',
    queryKey,
  }: QueryFunctionContext): Promise<FetchCharactersResponse> => {
    const [, { filters, sortOrder }] = queryKey as [
      string,
      { filters: Record<string, string>; sortOrder: string },
    ];

    const safePageParam = pageParam as string;
    return fetchCharacters({
      pageParam: safePageParam,
      filters,
      sort: sortOrder,
    });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<FetchCharactersResponse, Error>({
    queryKey: ['characters', { filters, sortOrder }],
    queryFn,
    getNextPageParam: lastPage => lastPage.info.next?.split('page=')[1],
    initialPageParam: '1',
  });

  const sortedCharacters = useMemo(() => {
    const characters: CharacterWithIndexSignature[] =
      data?.pages.flatMap(page => page.results.map(char => ({ ...char }))) ||
      [];

    return characters.sort((a, b) => {
      if (!sortOrder) return 0;

      const order = sortOrder.startsWith('-') ? -1 : 1;
      const field = sortOrder.replace(/^-/, '');

      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * order;
      } else {
        return 0;
      }
    });
  }, [data, sortOrder]);

  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [loadMoreRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, [filterType]: e.target.value };
    setFilterValue(e.target.value);
    updateFilters(newFilters);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  if (status === 'pending') return <Loading />;
  if (status === 'error')
    return <Error message={error?.message || 'Unknown error'} />;

  return (
    <div style={{ padding: 20 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Text strong>Filter and Sort Characters:</Text>
        <Space wrap>
          <Select
            defaultValue={filterType}
            style={{ width: 150 }}
            onChange={handleFilterTypeChange}
          >
            <Option value="name">Name</Option>
            <Option value="status">Status</Option>
            <Option value="species">Species</Option>
          </Select>
          <Input
            placeholder="Enter filter value"
            value={filterValue}
            onChange={handleFilterChange}
          />
          <Select
            defaultValue={sortOrder}
            style={{ width: 150 }}
            onChange={handleSortChange}
            placeholder="Sort by"
          >
            <Option value="">Sort By:</Option>
            <Option value="-name">Name Desc</Option>
            <Option value="name">Name Asc</Option>
            <Option value="-status">Status Desc</Option>
            <Option value="status">Status Asc</Option>
            <Option value="-species">Species Desc</Option>
            <Option value="species">Species Asc</Option>
          </Select>
        </Space>
        {sortedCharacters.length > 0 ? (
          <CharactersTemplate characters={sortedCharacters} />
        ) : (
          <Text>No results found.</Text>
        )}
        <div ref={loadMoreRef}>{isFetchingNextPage && <Loading />}</div>
      </Space>
    </div>
  );
};

export default CharactersPage;
