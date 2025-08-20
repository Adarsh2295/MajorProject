import { useEffect, useState } from 'react';
import { Checkbox, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../../Slices/FilterSlice';

const MultiInput=(props)=> {
  const dispatsch = useDispatch();
    useEffect(()=>{
        setData(props.options)

    }, [props.options])
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  const exactOptionMatch = data.some((item) => item === search);

  const handleValueSelect = (val) => {
    setSearch('');

    if (val === '$create') {
      setData((current) => [...current, search]);
      setValue((current) => [...current, search]);
      dispatsch(updateFilter({[props.title] : [...value, search]}))
    } else {
      dispatsch(updateFilter({[props.title]: value.includes(val)?value.filter((v)=>v!==val):[...value, val]}))
      setValue((current) =>
        current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
      );
    }
  };

  const handleValueRemove = (val) =>{
    dispatsch(updateFilter({[props.title]: value.filter((v)=> v!== val)}))
    setValue((current) => current.filter((v) => v !== val));
  }

  const values = value.slice(0,1).map((item)=>(
    <Pill key={item} withRemoveButton onRemove={()=>handleValueRemove(item)}>{item}</Pill>
  ));

  const options = data.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
    <Combobox.Option value={item} key={item}  active={value.includes(item)}>
      <Group gap="sm">
        <Checkbox size='xs' color='bright-sun.5'
          checked={value.includes(item)}
          
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
        />
        <span className='text-mine-shaft-700 dark:text-mine-shaft-300'>{item}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput variant='unstyled' rightSection={<IconSelector />} onClick={() => combobox.toggleDropdown()}
        leftSection={
            <div className='text-bright-sun-400 p-1 bg-gray-200 dark:bg-mine-shaft-900 rounded-full mr-2'><props.icon size={20}/></div>
        }>
          <Pill.Group>
            {values.length > 0 ? (
              <>
              {values}
              {value.length > 1 && (
                <Pill>+{value.length - 1} more</Pill>
              )}
              </>
            ) : (
              <Input.Placeholder className='!text-mine-shaft-600 dark:!text-mine-shaft-400'>{props.title}</Input.Placeholder>
            )}
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Search
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Search job"
            />
        <Combobox.Options  mah={200} style={{ overflowY: 'auto' }}>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch && search.trim().length > 0 && options.length === 0 && (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default MultiInput;