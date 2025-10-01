using iPractice.Api.Controllers.Clients.Dtos;
using iPractice.Api.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.UseCases.Clients;

public class GetAllClientsQuery : IRequest<List<ClientSummaryDto>>
{
}

public class GetAllClientsHandler : IRequestHandler<GetAllClientsQuery, List<ClientSummaryDto>>
{
    private readonly IClientSqlRepository _clientRepository;

    public GetAllClientsHandler(IClientSqlRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<List<ClientSummaryDto>> Handle(GetAllClientsQuery request, CancellationToken cancellationToken)
    {
        var clients = await _clientRepository.GetAllAsync(cancellationToken);
        
        return clients.Select(c => new ClientSummaryDto(c.Id, c.Name)).ToList();
    }
} 